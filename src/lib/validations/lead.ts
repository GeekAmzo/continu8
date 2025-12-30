import { z } from 'zod'

// Contact information schema
export const contactInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  jobTitle: z.string().min(2, 'Job title is required'),
})

// Company information schema
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Please select an industry'),
  annualRevenue: z.enum([
    'under_5m',
    '5m_10m',
    '10m_25m',
    '25m_50m',
    '50m_100m',
    '100m_200m',
    'over_200m',
  ]),
  employeeCount: z.enum([
    'under_10',
    '10_20',
    '20_50',
    '50_100',
    '100_200',
    'over_200',
  ]),
})

// Challenges and goals schema
export const challengesGoalsSchema = z.object({
  primaryChallenge: z.enum([
    'manual_work',
    'disconnected_systems',
    'scaling_issues',
    'security_concerns',
    'poor_data_visibility',
    'other',
  ]),
  otherChallenge: z.string().optional(),
  specificPainPoints: z.string().min(20, 'Please provide at least 20 characters'),
  desiredOutcomes: z.string().min(20, 'Please provide at least 20 characters'),
  timeline: z.enum([
    'urgent_1_month',
    'soon_1_3_months',
    'planning_3_6_months',
    'exploring_6_plus_months',
  ]),
})

// Budget and decision-making schema
export const budgetDecisionSchema = z.object({
  monthlyBudget: z.enum([
    'under_30k',
    '30k_60k',
    '60k_100k',
    '100k_150k',
    'over_150k',
    'not_sure',
  ]),
  decisionAuthority: z.enum([
    'final_decision_maker',
    'key_influencer',
    'part_of_committee',
    'gathering_info',
  ]),
  decisionTimeframe: z.enum([
    'ready_now',
    'within_month',
    'within_quarter',
    'just_exploring',
  ]),
  currentSolutions: z.string().optional(),
})

// Booking preferences schema
export const bookingPreferencesSchema = z.object({
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  timezone: z.string().default('Africa/Johannesburg'),
  additionalNotes: z.string().optional(),
})

// Combined lead schema (for server-side processing)
export const leadSchema = z.object({
  // Contact info
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  jobTitle: z.string().min(2),

  // Company info
  companyName: z.string().min(2),
  website: z.string().optional(),
  industry: z.string().min(2),
  annualRevenue: z.string(),
  employeeCount: z.string(),

  // Challenges and goals
  primaryChallenge: z.string(),
  otherChallenge: z.string().optional(),
  specificPainPoints: z.string(),
  desiredOutcomes: z.string(),
  timeline: z.string(),

  // Budget and decision
  monthlyBudget: z.string(),
  decisionAuthority: z.string(),
  decisionTimeframe: z.string(),
  currentSolutions: z.string().optional(),

  // Booking preferences
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  timezone: z.string().default('Africa/Johannesburg'),
  additionalNotes: z.string().optional(),
})

// Booking schema (for creating booking records)
export const bookingSchema = z.object({
  leadId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  duration: z.number().default(60),
  meetingType: z.enum(['discovery_call', 'audit', 'demo']).default('discovery_call'),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']).default('scheduled'),
  calendarEventId: z.string().optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
})

// Type exports
export type ContactInfo = z.infer<typeof contactInfoSchema>
export type CompanyInfo = z.infer<typeof companyInfoSchema>
export type ChallengesGoals = z.infer<typeof challengesGoalsSchema>
export type BudgetDecision = z.infer<typeof budgetDecisionSchema>
export type BookingPreferences = z.infer<typeof bookingPreferencesSchema>
export type Lead = z.infer<typeof leadSchema>
export type Booking = z.infer<typeof bookingSchema>
