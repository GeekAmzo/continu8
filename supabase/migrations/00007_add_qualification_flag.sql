-- =====================================================
-- ADD QUALIFICATION FLAG TO LEADS
-- Track if lead meets ideal customer profile without blocking submission
-- =====================================================

-- Add qualification flag
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS meets_ideal_criteria BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS qualification_notes TEXT;

-- Create index for filtering
CREATE INDEX IF NOT EXISTS idx_leads_qualification ON public.leads(meets_ideal_criteria);

-- Add comments
COMMENT ON COLUMN public.leads.meets_ideal_criteria IS 'Whether lead meets ideal customer criteria (R10m+ revenue, R60k+ budget). False means they are below thresholds but still captured as a lead.';
COMMENT ON COLUMN public.leads.qualification_notes IS 'Notes about why lead does not meet ideal criteria (e.g., "Revenue below R10m", "Budget below R60k")';
