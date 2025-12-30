-- =====================================================
-- CONTINU8 CRM TABLES
-- =====================================================
-- This migration creates all CRM-related tables:
-- Leads, Clients, Contacts, Deals, Activities, Bookings
-- =====================================================

-- =====================================================
-- LEADS TABLE
-- Captures lead information from website booking form
-- =====================================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Company information
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Qualification data (from booking form)
  annual_revenue_range TEXT CHECK (annual_revenue_range IN (
    'below_10m', '10m-50m', '50m-100m', '100m-200m', 'above_200m'
  )),
  employee_count_range TEXT CHECK (employee_count_range IN (
    'below_20', '20-50', '50-100', '100-200', 'above_200'
  )),
  primary_challenge TEXT,
  budget_range TEXT CHECK (budget_range IN (
    'below_60k', '60k-80k', '80k-100k', '100k+'
  )),
  decision_authority TEXT CHECK (decision_authority IN (
    'sole', 'influencer', 'team'
  )),

  -- Lead metadata
  source TEXT DEFAULT 'website' NOT NULL CHECK (source IN (
    'website', 'referral', 'direct', 'linkedin', 'other'
  )),
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN (
    'new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost'
  )),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),

  -- Assignment
  assigned_to UUID REFERENCES public.team_members(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  contacted_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(contact_email);
CREATE INDEX idx_leads_score ON public.leads(score DESC);

-- =====================================================
-- CLIENTS TABLE
-- Active and churned clients
-- =====================================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,

  -- Company information
  company_name TEXT NOT NULL,
  company_size TEXT,
  industry TEXT,
  website TEXT,

  -- Primary contact (linked to profile for portal access)
  primary_contact_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Contract details
  contract_type TEXT CHECK (contract_type IN (
    'retainer', 'build_retain', 'audit', 'custom'
  )),
  monthly_retainer DECIMAL(10, 2),
  contract_start_date DATE,
  contract_end_date DATE,

  -- Status and health
  status TEXT DEFAULT 'active' NOT NULL CHECK (status IN (
    'active', 'paused', 'churned'
  )),
  health_score INTEGER DEFAULT 100 CHECK (health_score >= 0 AND health_score <= 100),

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_primary_contact ON public.clients(primary_contact_id);
CREATE INDEX idx_clients_lead ON public.clients(lead_id);

-- =====================================================
-- CONTACTS TABLE
-- All contacts associated with clients
-- =====================================================
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  is_primary BOOLEAN DEFAULT false NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_contacts_client ON public.contacts(client_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_profile ON public.contacts(profile_id);

-- =====================================================
-- DEALS TABLE
-- Sales pipeline tracking
-- =====================================================
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  description TEXT,
  value DECIMAL(12, 2) NOT NULL,

  -- Pipeline stages
  stage TEXT DEFAULT 'discovery' NOT NULL CHECK (stage IN (
    'discovery', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  )),
  probability INTEGER DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),

  -- Dates
  expected_close_date DATE,
  closed_date DATE,

  -- Assignment
  owner_id UUID REFERENCES public.team_members(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_deals_stage ON public.deals(stage);
CREATE INDEX idx_deals_owner ON public.deals(owner_id);
CREATE INDEX idx_deals_lead ON public.deals(lead_id);
CREATE INDEX idx_deals_client ON public.deals(client_id);
CREATE INDEX idx_deals_expected_close ON public.deals(expected_close_date);

-- =====================================================
-- ACTIVITIES TABLE
-- Timeline of interactions (calls, emails, meetings, notes)
-- =====================================================
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Polymorphic relationships (activity can be linked to lead, client, or deal)
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,

  -- Activity details
  type TEXT NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'note', 'task')),
  subject TEXT NOT NULL,
  description TEXT,

  -- Metadata
  created_by UUID REFERENCES public.team_members(id) ON DELETE SET NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Constraint: must be linked to at least one entity
  CONSTRAINT activities_entity_check CHECK (
    lead_id IS NOT NULL OR client_id IS NOT NULL OR deal_id IS NOT NULL
  )
);

-- Indexes
CREATE INDEX idx_activities_lead ON public.activities(lead_id);
CREATE INDEX idx_activities_client ON public.activities(client_id);
CREATE INDEX idx_activities_deal ON public.activities(deal_id);
CREATE INDEX idx_activities_type ON public.activities(type);
CREATE INDEX idx_activities_created_by ON public.activities(created_by);
CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);

-- =====================================================
-- BOOKINGS TABLE
-- Strategy call scheduling
-- =====================================================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,

  -- Booking details
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60 NOT NULL,
  meeting_type TEXT DEFAULT 'strategy_call' NOT NULL,

  -- Calendar integration
  calendar_event_id TEXT,
  meeting_link TEXT,

  -- Status
  status TEXT DEFAULT 'scheduled' NOT NULL CHECK (status IN (
    'scheduled', 'completed', 'cancelled', 'no_show', 'rescheduled'
  )),

  -- Assignment
  assigned_to UUID REFERENCES public.team_members(id) ON DELETE SET NULL,

  -- Notes
  pre_call_notes TEXT,
  post_call_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_bookings_scheduled_at ON public.bookings(scheduled_at);
CREATE INDEX idx_bookings_lead ON public.bookings(lead_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_assigned_to ON public.bookings(assigned_to);

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE public.leads IS 'Leads captured from website booking form with qualification data';
COMMENT ON TABLE public.clients IS 'Active and past clients with contract information';
COMMENT ON TABLE public.contacts IS 'All contacts associated with clients';
COMMENT ON TABLE public.deals IS 'Sales pipeline and deal tracking';
COMMENT ON TABLE public.activities IS 'Timeline of all interactions (calls, emails, meetings, notes)';
COMMENT ON TABLE public.bookings IS 'Strategy call bookings linked to leads';

COMMENT ON COLUMN public.leads.score IS 'Lead quality score (0-100) calculated based on qualification criteria';
COMMENT ON COLUMN public.clients.health_score IS 'Client health score (0-100) based on engagement and satisfaction';
COMMENT ON COLUMN public.deals.probability IS 'Probability of closing the deal (0-100%)';
