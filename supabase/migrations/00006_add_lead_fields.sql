-- =====================================================
-- ADD MISSING LEAD FIELDS
-- Extend leads table to match booking form data collection
-- =====================================================

-- Add individual name fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS job_title TEXT;

-- Add company detail fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS industry TEXT;

-- Add challenge and goals fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS other_challenge TEXT,
  ADD COLUMN IF NOT EXISTS specific_pain_points TEXT,
  ADD COLUMN IF NOT EXISTS desired_outcomes TEXT,
  ADD COLUMN IF NOT EXISTS timeline TEXT CHECK (timeline IN (
    'urgent_1_month', 'soon_1_3_months', 'planning_3_6_months', 'exploring_6_plus_months'
  ));

-- Add budget and decision fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS monthly_budget_range TEXT CHECK (monthly_budget_range IN (
    'under_30k', '30k_60k', '60k_100k', '100k_150k', 'over_150k', 'not_sure'
  )),
  ADD COLUMN IF NOT EXISTS decision_timeframe TEXT CHECK (decision_timeframe IN (
    'ready_now', 'within_month', 'within_quarter', 'just_exploring'
  )),
  ADD COLUMN IF NOT EXISTS current_solutions TEXT;

-- Add scoring field
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100);

-- Add UTM tracking fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- Rename old columns to be consistent with booking form
-- (We'll keep both for backwards compatibility)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update source enum to include more options
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_source_check;
ALTER TABLE public.leads
  ADD CONSTRAINT leads_source_check CHECK (source IN (
    'website', 'website_booking', 'referral', 'direct', 'linkedin', 'other'
  ));

-- Update status enum to include 'hot', 'warm', 'cold', 'qualified'
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE public.leads
  ADD CONSTRAINT leads_status_check CHECK (status IN (
    'new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost', 'hot', 'warm', 'cold'
  ));

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_leads_first_name ON public.leads(first_name);
CREATE INDEX IF NOT EXISTS idx_leads_last_name ON public.leads(last_name);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON public.leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_timeline ON public.leads(timeline);

-- Add comments
COMMENT ON COLUMN public.leads.first_name IS 'Contact first name from booking form';
COMMENT ON COLUMN public.leads.last_name IS 'Contact last name from booking form';
COMMENT ON COLUMN public.leads.job_title IS 'Contact job title';
COMMENT ON COLUMN public.leads.lead_score IS 'Calculated lead score (0-100) based on qualification criteria';
COMMENT ON COLUMN public.leads.timeline IS 'Implementation timeline from booking form';
COMMENT ON COLUMN public.leads.monthly_budget_range IS 'Monthly budget range from booking form';
COMMENT ON COLUMN public.leads.decision_timeframe IS 'Decision making timeframe';
