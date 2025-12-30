-- =====================================================
-- DATABASE FUNCTIONS AND TRIGGERS
-- =====================================================
-- This migration creates functions and triggers for:
-- - Automatic timestamps
-- - Lead scoring
-- - SLA calculation
-- - Auto-assignment
-- - Audit logging
-- =====================================================

-- =====================================================
-- AUTOMATIC UPDATED_AT TIMESTAMP
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ticket_comments_updated_at
  BEFORE UPDATE ON public.ticket_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- LEAD SCORING FUNCTION
-- =====================================================

-- Calculate lead score based on qualification criteria
CREATE OR REPLACE FUNCTION public.calculate_lead_score(
  p_annual_revenue_range TEXT,
  p_employee_count_range TEXT,
  p_budget_range TEXT,
  p_decision_authority TEXT
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Revenue range scoring (max 40 points)
  CASE p_annual_revenue_range
    WHEN '100m-200m' THEN score := score + 40;
    WHEN 'above_200m' THEN score := score + 40;
    WHEN '50m-100m' THEN score := score + 30;
    WHEN '10m-50m' THEN score := score + 20;
    WHEN 'below_10m' THEN score := score + 0;
    ELSE NULL;
  END CASE;

  -- Budget range scoring (max 30 points)
  CASE p_budget_range
    WHEN '100k+' THEN score := score + 30;
    WHEN '80k-100k' THEN score := score + 25;
    WHEN '60k-80k' THEN score := score + 15;
    WHEN 'below_60k' THEN score := score + 0;
    ELSE NULL;
  END CASE;

  -- Decision authority (max 20 points)
  CASE p_decision_authority
    WHEN 'sole' THEN score := score + 20;
    WHEN 'influencer' THEN score := score + 12;
    WHEN 'team' THEN score := score + 5;
    ELSE NULL;
  END CASE;

  -- Employee count (max 10 points)
  CASE p_employee_count_range
    WHEN 'above_200' THEN score := score + 10;
    WHEN '100-200' THEN score := score + 10;
    WHEN '50-100' THEN score := score + 8;
    WHEN '20-50' THEN score := score + 5;
    WHEN 'below_20' THEN score := score + 0;
    ELSE NULL;
  END CASE;

  RETURN score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-calculate lead score on insert/update
CREATE OR REPLACE FUNCTION public.auto_calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.score := public.calculate_lead_score(
    NEW.annual_revenue_range,
    NEW.employee_count_range,
    NEW.budget_range,
    NEW.decision_authority
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_lead_score_on_insert
  BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.auto_calculate_lead_score();

CREATE TRIGGER calculate_lead_score_on_update
  BEFORE UPDATE OF annual_revenue_range, employee_count_range, budget_range, decision_authority
  ON public.leads
  FOR EACH ROW
  WHEN (
    OLD.annual_revenue_range IS DISTINCT FROM NEW.annual_revenue_range OR
    OLD.employee_count_range IS DISTINCT FROM NEW.employee_count_range OR
    OLD.budget_range IS DISTINCT FROM NEW.budget_range OR
    OLD.decision_authority IS DISTINCT FROM NEW.decision_authority
  )
  EXECUTE FUNCTION public.auto_calculate_lead_score();

-- =====================================================
-- SLA CALCULATION FOR TICKETS
-- =====================================================

-- Calculate SLA due time based on priority
CREATE OR REPLACE FUNCTION public.calculate_sla_due(
  p_priority TEXT,
  p_created_at TIMESTAMPTZ
)
RETURNS TIMESTAMPTZ AS $$
BEGIN
  CASE p_priority
    WHEN 'urgent' THEN RETURN p_created_at + INTERVAL '2 hours';
    WHEN 'high' THEN RETURN p_created_at + INTERVAL '4 hours';
    WHEN 'medium' THEN RETURN p_created_at + INTERVAL '8 hours';
    WHEN 'low' THEN RETURN p_created_at + INTERVAL '24 hours';
    ELSE RETURN p_created_at + INTERVAL '8 hours';
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Auto-calculate SLA on ticket insert
CREATE OR REPLACE FUNCTION public.auto_calculate_ticket_sla()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.sla_due_at IS NULL THEN
    NEW.sla_due_at := public.calculate_sla_due(NEW.priority, NEW.created_at);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_ticket_sla_on_insert
  BEFORE INSERT ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.auto_calculate_ticket_sla();

-- Recalculate SLA when priority changes
CREATE TRIGGER recalculate_ticket_sla_on_priority_change
  BEFORE UPDATE OF priority ON public.tickets
  FOR EACH ROW
  WHEN (OLD.priority IS DISTINCT FROM NEW.priority)
  EXECUTE FUNCTION public.auto_calculate_ticket_sla();

-- =====================================================
-- AUTO-ASSIGN TICKETS
-- =====================================================

-- Auto-assign tickets to support team member with least workload
CREATE OR REPLACE FUNCTION public.auto_assign_ticket()
RETURNS TRIGGER AS $$
DECLARE
  available_agent UUID;
BEGIN
  -- Only auto-assign if no assignment specified
  IF NEW.assigned_to IS NULL THEN
    -- Find support team member with fewest open tickets
    SELECT tm.id INTO available_agent
    FROM public.team_members tm
    JOIN public.profiles p ON p.id = tm.id
    WHERE p.role = 'support' AND tm.is_active = true
    ORDER BY (
      SELECT COUNT(*) FROM public.tickets
      WHERE assigned_to = tm.id
        AND status IN ('open', 'in_progress', 'waiting_client')
    ) ASC
    LIMIT 1;

    NEW.assigned_to := available_agent;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_new_ticket
  BEFORE INSERT ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_ticket();

-- =====================================================
-- AUTO-ASSIGN LEADS
-- =====================================================

-- Auto-assign leads to sales team member with least workload
CREATE OR REPLACE FUNCTION public.auto_assign_lead()
RETURNS TRIGGER AS $$
DECLARE
  available_sales UUID;
BEGIN
  -- Only auto-assign if no assignment specified
  IF NEW.assigned_to IS NULL THEN
    -- Find sales team member with fewest active leads
    SELECT tm.id INTO available_sales
    FROM public.team_members tm
    JOIN public.profiles p ON p.id = tm.id
    WHERE p.role IN ('admin', 'sales') AND tm.is_active = true
    ORDER BY (
      SELECT COUNT(*) FROM public.leads
      WHERE assigned_to = tm.id
        AND status IN ('new', 'contacted', 'qualified')
    ) ASC
    LIMIT 1;

    NEW.assigned_to := available_sales;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_new_lead
  BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_lead();

-- =====================================================
-- AUDIT LOGGING TRIGGER
-- =====================================================

-- Generic audit log trigger function
CREATE OR REPLACE FUNCTION public.audit_log_changes()
RETURNS TRIGGER AS $$
DECLARE
  old_data JSONB;
  new_data JSONB;
  action_type TEXT;
BEGIN
  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    action_type := 'created';
    old_data := NULL;
    new_data := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    action_type := 'updated';
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
  ELSIF TG_OP = 'DELETE' THEN
    action_type := 'deleted';
    old_data := to_jsonb(OLD);
    new_data := NULL;
  END IF;

  -- Insert audit log
  INSERT INTO public.audit_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    action_type,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    old_data,
    new_data
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit logging to critical tables
CREATE TRIGGER audit_clients_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

CREATE TRIGGER audit_tickets_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

CREATE TRIGGER audit_deals_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.audit_log_changes();

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to get open tickets count for a client
CREATE OR REPLACE FUNCTION public.get_client_open_tickets_count(p_client_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM public.tickets
    WHERE client_id = p_client_id
      AND status IN ('open', 'in_progress', 'waiting_client')
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get total pipeline value
CREATE OR REPLACE FUNCTION public.get_pipeline_value(p_stage TEXT DEFAULT NULL)
RETURNS DECIMAL AS $$
BEGIN
  IF p_stage IS NULL THEN
    RETURN (
      SELECT COALESCE(SUM(value), 0)
      FROM public.deals
      WHERE stage NOT IN ('closed_won', 'closed_lost')
    );
  ELSE
    RETURN (
      SELECT COALESCE(SUM(value), 0)
      FROM public.deals
      WHERE stage = p_stage
    );
  END IF;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to check if ticket is overdue
CREATE OR REPLACE FUNCTION public.is_ticket_overdue(p_ticket_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT sla_due_at < NOW() AND status NOT IN ('resolved', 'closed')
    FROM public.tickets
    WHERE id = p_ticket_id
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON FUNCTION public.calculate_lead_score IS 'Calculate lead quality score (0-100) based on qualification criteria';
COMMENT ON FUNCTION public.calculate_sla_due IS 'Calculate SLA due time based on ticket priority';
COMMENT ON FUNCTION public.auto_assign_ticket IS 'Auto-assign tickets to support team member with least workload';
COMMENT ON FUNCTION public.auto_assign_lead IS 'Auto-assign leads to sales team member with least workload';
COMMENT ON FUNCTION public.get_client_open_tickets_count IS 'Get count of open tickets for a client';
COMMENT ON FUNCTION public.get_pipeline_value IS 'Get total value of deals in pipeline (optionally filtered by stage)';
COMMENT ON FUNCTION public.is_ticket_overdue IS 'Check if ticket has breached SLA';
