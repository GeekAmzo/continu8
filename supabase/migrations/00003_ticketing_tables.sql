-- =====================================================
-- CONTINU8 TICKETING SYSTEM TABLES
-- =====================================================
-- This migration creates all support ticketing tables:
-- Tickets, Comments, Attachments, and Audit Logs
-- =====================================================

-- =====================================================
-- TICKETS TABLE
-- Support tickets from clients
-- =====================================================
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number SERIAL UNIQUE NOT NULL,

  -- Relationships
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.team_members(id) ON DELETE SET NULL,

  -- Ticket details
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' NOT NULL CHECK (priority IN (
    'low', 'medium', 'high', 'urgent'
  )),
  status TEXT DEFAULT 'open' NOT NULL CHECK (status IN (
    'open', 'in_progress', 'waiting_client', 'resolved', 'closed'
  )),
  category TEXT CHECK (category IN (
    'technical', 'billing', 'general', 'feature_request', 'bug'
  )),

  -- SLA tracking
  sla_due_at TIMESTAMPTZ,
  first_response_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_tickets_client ON public.tickets(client_id);
CREATE INDEX idx_tickets_assigned_to ON public.tickets(assigned_to);
CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_tickets_priority ON public.tickets(priority);
CREATE INDEX idx_tickets_created_at ON public.tickets(created_at DESC);
CREATE INDEX idx_tickets_sla_due ON public.tickets(sla_due_at) WHERE sla_due_at IS NOT NULL;
CREATE INDEX idx_tickets_number ON public.tickets(ticket_number);

-- =====================================================
-- TICKET COMMENTS TABLE
-- All comments on tickets (internal notes + public responses)
-- =====================================================
CREATE TABLE public.ticket_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,

  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_ticket_comments_ticket ON public.ticket_comments(ticket_id);
CREATE INDEX idx_ticket_comments_author ON public.ticket_comments(author_id);
CREATE INDEX idx_ticket_comments_created_at ON public.ticket_comments(created_at DESC);
CREATE INDEX idx_ticket_comments_is_internal ON public.ticket_comments(is_internal);

-- =====================================================
-- TICKET ATTACHMENTS TABLE
-- File attachments for tickets (stored in Supabase Storage)
-- =====================================================
CREATE TABLE public.ticket_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.ticket_comments(id) ON DELETE CASCADE,

  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,

  uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_ticket_attachments_ticket ON public.ticket_attachments(ticket_id);
CREATE INDEX idx_ticket_attachments_comment ON public.ticket_attachments(comment_id);

-- =====================================================
-- AUDIT LOGS TABLE
-- Track all significant changes for compliance
-- =====================================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who did what
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted')),
  entity_type TEXT NOT NULL,
  entity_id UUID,

  -- Change details
  old_values JSONB,
  new_values JSONB,

  -- Context
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE public.tickets IS 'Support tickets with SLA tracking';
COMMENT ON TABLE public.ticket_comments IS 'All comments on tickets (internal notes and public responses)';
COMMENT ON TABLE public.ticket_attachments IS 'File attachments linked to tickets or comments';
COMMENT ON TABLE public.audit_logs IS 'Audit trail of all significant changes for compliance';

COMMENT ON COLUMN public.tickets.ticket_number IS 'Human-friendly sequential ticket number';
COMMENT ON COLUMN public.tickets.sla_due_at IS 'When SLA expires based on priority';
COMMENT ON COLUMN public.ticket_comments.is_internal IS 'True for internal notes, false for public responses visible to client';
COMMENT ON COLUMN public.ticket_attachments.file_path IS 'Path in Supabase Storage bucket';
