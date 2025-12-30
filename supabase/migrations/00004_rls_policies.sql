-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- This migration enables RLS and creates policies for all tables.
-- Security model:
-- - Team members (admin/sales/support): Full access to their scope
-- - Clients: Only their own data (tickets, profile)
-- - Public: No direct database access
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Check if current user is a team member
CREATE OR REPLACE FUNCTION public.is_team_member()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'sales', 'support')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is a client
CREATE OR REPLACE FUNCTION public.is_client()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'client'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get client ID for current user
CREATE OR REPLACE FUNCTION public.get_user_client_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT c.client_id FROM public.contacts c
    WHERE c.profile_id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY "users_can_view_own_profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Team members can view all profiles
CREATE POLICY "team_members_can_view_all_profiles"
  ON public.profiles FOR SELECT
  USING (public.is_team_member());

-- Users can update their own profile
CREATE POLICY "users_can_update_own_profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can insert profiles (user creation)
CREATE POLICY "admins_can_insert_profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.is_admin());

-- =====================================================
-- TEAM MEMBERS POLICIES
-- =====================================================

-- Team members can view all team members
CREATE POLICY "team_members_can_view_team"
  ON public.team_members FOR SELECT
  USING (public.is_team_member());

-- Admins can manage team members
CREATE POLICY "admins_can_manage_team"
  ON public.team_members FOR ALL
  USING (public.is_admin());

-- =====================================================
-- LEADS POLICIES
-- =====================================================

-- Team members can view all leads
CREATE POLICY "team_members_can_view_leads"
  ON public.leads FOR SELECT
  USING (public.is_team_member());

-- Team members can create leads
CREATE POLICY "team_members_can_create_leads"
  ON public.leads FOR INSERT
  WITH CHECK (public.is_team_member());

-- Team members can update leads
CREATE POLICY "team_members_can_update_leads"
  ON public.leads FOR UPDATE
  USING (public.is_team_member());

-- Admins can delete leads
CREATE POLICY "admins_can_delete_leads"
  ON public.leads FOR DELETE
  USING (public.is_admin());

-- =====================================================
-- CLIENTS POLICIES
-- =====================================================

-- Team members can view all clients
CREATE POLICY "team_members_can_view_clients"
  ON public.clients FOR SELECT
  USING (public.is_team_member());

-- Team members can create/update clients
CREATE POLICY "team_members_can_manage_clients"
  ON public.clients FOR INSERT
  WITH CHECK (public.is_team_member());

CREATE POLICY "team_members_can_update_clients"
  ON public.clients FOR UPDATE
  USING (public.is_team_member());

-- =====================================================
-- CONTACTS POLICIES
-- =====================================================

-- Team members can view all contacts
CREATE POLICY "team_members_can_view_contacts"
  ON public.contacts FOR SELECT
  USING (public.is_team_member());

-- Clients can view contacts from their own client record
CREATE POLICY "clients_can_view_own_contacts"
  ON public.contacts FOR SELECT
  USING (
    public.is_client() AND
    client_id = public.get_user_client_id()
  );

-- Team members can manage contacts
CREATE POLICY "team_members_can_manage_contacts"
  ON public.contacts FOR ALL
  USING (public.is_team_member());

-- =====================================================
-- DEALS POLICIES
-- =====================================================

-- Team members can view all deals
CREATE POLICY "team_members_can_view_deals"
  ON public.deals FOR SELECT
  USING (public.is_team_member());

-- Team members can manage deals
CREATE POLICY "team_members_can_manage_deals"
  ON public.deals FOR ALL
  USING (public.is_team_member());

-- =====================================================
-- ACTIVITIES POLICIES
-- =====================================================

-- Team members can view all activities
CREATE POLICY "team_members_can_view_activities"
  ON public.activities FOR SELECT
  USING (public.is_team_member());

-- Team members can create activities
CREATE POLICY "team_members_can_create_activities"
  ON public.activities FOR INSERT
  WITH CHECK (public.is_team_member());

-- Team members can update their own activities
CREATE POLICY "team_members_can_update_own_activities"
  ON public.activities FOR UPDATE
  USING (
    public.is_team_member() AND
    (created_by = auth.uid() OR public.is_admin())
  );

-- =====================================================
-- BOOKINGS POLICIES
-- =====================================================

-- Team members can view all bookings
CREATE POLICY "team_members_can_view_bookings"
  ON public.bookings FOR SELECT
  USING (public.is_team_member());

-- Team members can manage bookings
CREATE POLICY "team_members_can_manage_bookings"
  ON public.bookings FOR ALL
  USING (public.is_team_member());

-- =====================================================
-- TICKETS POLICIES
-- =====================================================

-- Team members can view all tickets
CREATE POLICY "team_members_can_view_all_tickets"
  ON public.tickets FOR SELECT
  USING (public.is_team_member());

-- Clients can view their own tickets
CREATE POLICY "clients_can_view_own_tickets"
  ON public.tickets FOR SELECT
  USING (
    public.is_client() AND
    client_id = public.get_user_client_id()
  );

-- Clients can create tickets for their own client record
CREATE POLICY "clients_can_create_tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (
    public.is_client() AND
    client_id = public.get_user_client_id() AND
    created_by = auth.uid()
  );

-- Team members can create tickets
CREATE POLICY "team_members_can_create_tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (public.is_team_member());

-- Team members can update tickets
CREATE POLICY "team_members_can_update_tickets"
  ON public.tickets FOR UPDATE
  USING (public.is_team_member());

-- =====================================================
-- TICKET COMMENTS POLICIES
-- =====================================================

-- Team members can view all comments
CREATE POLICY "team_members_can_view_all_comments"
  ON public.ticket_comments FOR SELECT
  USING (public.is_team_member());

-- Clients can view non-internal comments on their tickets
CREATE POLICY "clients_can_view_public_comments"
  ON public.ticket_comments FOR SELECT
  USING (
    public.is_client() AND
    is_internal = false AND
    ticket_id IN (
      SELECT id FROM public.tickets
      WHERE client_id = public.get_user_client_id()
    )
  );

-- Users can create comments on tickets they have access to
CREATE POLICY "users_can_create_comments"
  ON public.ticket_comments FOR INSERT
  WITH CHECK (
    (public.is_team_member()) OR
    (public.is_client() AND ticket_id IN (
      SELECT id FROM public.tickets
      WHERE client_id = public.get_user_client_id()
    ))
  );

-- Team members can update their own comments
CREATE POLICY "team_members_can_update_own_comments"
  ON public.ticket_comments FOR UPDATE
  USING (
    public.is_team_member() AND
    (author_id = auth.uid() OR public.is_admin())
  );

-- =====================================================
-- TICKET ATTACHMENTS POLICIES
-- =====================================================

-- Team members can view all attachments
CREATE POLICY "team_members_can_view_all_attachments"
  ON public.ticket_attachments FOR SELECT
  USING (public.is_team_member());

-- Clients can view attachments on their tickets
CREATE POLICY "clients_can_view_own_attachments"
  ON public.ticket_attachments FOR SELECT
  USING (
    public.is_client() AND
    ticket_id IN (
      SELECT id FROM public.tickets
      WHERE client_id = public.get_user_client_id()
    )
  );

-- Users can upload attachments to tickets they have access to
CREATE POLICY "users_can_upload_attachments"
  ON public.ticket_attachments FOR INSERT
  WITH CHECK (
    (public.is_team_member()) OR
    (public.is_client() AND ticket_id IN (
      SELECT id FROM public.tickets
      WHERE client_id = public.get_user_client_id()
    ))
  );

-- =====================================================
-- AUDIT LOGS POLICIES
-- =====================================================

-- Only admins can view audit logs
CREATE POLICY "admins_can_view_audit_logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

-- System can insert audit logs (used by triggers)
CREATE POLICY "system_can_insert_audit_logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);
