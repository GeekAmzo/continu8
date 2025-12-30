'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import { leadSchema, type Lead } from '@/lib/validations/lead'

// Calculate lead score based on qualification data
function calculateLeadScore(data: Lead): number {
  let score = 0

  // Revenue scoring (0-40 points)
  const revenueScores: Record<string, number> = {
    under_5m: 0,
    '5m_10m': 10,
    '10m_25m': 20,
    '25m_50m': 30,
    '50m_100m': 35,
    '100m_200m': 40,
    over_200m: 40,
  }
  score += revenueScores[data.annualRevenue] || 0

  // Budget scoring (0-30 points)
  const budgetScores: Record<string, number> = {
    under_30k: 0,
    '30k_60k': 10,
    '60k_100k': 25,
    '100k_150k': 30,
    over_150k: 30,
    not_sure: 15,
  }
  score += budgetScores[data.monthlyBudget] || 0

  // Decision authority scoring (0-15 points)
  const authorityScores: Record<string, number> = {
    final_decision_maker: 15,
    key_influencer: 10,
    part_of_committee: 5,
    gathering_info: 0,
  }
  score += authorityScores[data.decisionAuthority] || 0

  // Timeline scoring (0-10 points)
  const timelineScores: Record<string, number> = {
    urgent_1_month: 10,
    soon_1_3_months: 8,
    planning_3_6_months: 5,
    exploring_6_plus_months: 2,
  }
  score += timelineScores[data.timeline] || 0

  // Decision timeframe scoring (0-5 points)
  const decisionScores: Record<string, number> = {
    ready_now: 5,
    within_month: 4,
    within_quarter: 2,
    just_exploring: 0,
  }
  score += decisionScores[data.decisionTimeframe] || 0

  return score
}

// Determine lead status based on score
function getLeadStatus(score: number): string {
  if (score >= 80) return 'hot'
  if (score >= 60) return 'warm'
  if (score >= 40) return 'qualified'
  return 'cold'
}

export async function submitBooking(data: Lead) {
  try {
    // Validate data
    const validated = leadSchema.parse(data)

    // Use admin client to bypass RLS for public form submissions
    const supabase = createAdminClient()

    // Calculate lead score
    const score = calculateLeadScore(validated)
    const status = getLeadStatus(score)

    // Check if lead meets ideal criteria
    const meetsIdealCriteria =
      validated.annualRevenue !== 'under_5m' &&
      validated.annualRevenue !== '5m_10m' &&
      validated.monthlyBudget !== 'under_30k' &&
      validated.monthlyBudget !== '30k_60k'

    // Build qualification notes if they don't meet criteria
    const qualificationNotes: string[] = []
    if (validated.annualRevenue === 'under_5m' || validated.annualRevenue === '5m_10m') {
      qualificationNotes.push('Revenue below R10m')
    }
    if (validated.monthlyBudget === 'under_30k' || validated.monthlyBudget === '30k_60k') {
      qualificationNotes.push('Budget below R60k/month')
    }

    // Create lead record
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        // Contact info
        first_name: validated.firstName,
        last_name: validated.lastName,
        contact_name: `${validated.firstName} ${validated.lastName}`,
        email: validated.email,
        contact_email: validated.email,
        phone: validated.phone,
        contact_phone: validated.phone,
        job_title: validated.jobTitle,

        // Company info
        company_name: validated.companyName,
        website: validated.website || null,
        industry: validated.industry,
        annual_revenue_range: validated.annualRevenue,
        employee_count_range: validated.employeeCount,

        // Challenges and goals
        primary_challenge: validated.primaryChallenge,
        other_challenge: validated.otherChallenge || null,
        specific_pain_points: validated.specificPainPoints,
        desired_outcomes: validated.desiredOutcomes,
        timeline: validated.timeline,

        // Budget and decision
        monthly_budget_range: validated.monthlyBudget,
        decision_authority: validated.decisionAuthority,
        decision_timeframe: validated.decisionTimeframe,
        current_solutions: validated.currentSolutions || null,

        // Scoring
        lead_score: score,
        status: status,

        // Qualification tracking
        meets_ideal_criteria: meetsIdealCriteria,
        qualification_notes: qualificationNotes.length > 0 ? qualificationNotes.join('; ') : null,

        // Source tracking
        source: 'website_booking',
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
      })
      .select()
      .single()

    if (leadError) {
      console.error('Error creating lead:', leadError)
      throw new Error('Failed to create lead')
    }

    // Create booking record if preferred date/time provided
    if (validated.preferredDate && validated.preferredTime) {
      // Combine date and time into ISO datetime string
      const scheduledAt = new Date(
        `${validated.preferredDate}T${validated.preferredTime}:00`
      ).toISOString()

      const { error: bookingError } = await supabase.from('bookings').insert({
        lead_id: lead.id,
        scheduled_at: scheduledAt,
        duration: 60,
        meeting_type: 'discovery_call',
        status: 'scheduled',
        timezone: validated.timezone || 'Africa/Johannesburg',
        notes: validated.additionalNotes || null,
      })

      if (bookingError) {
        console.error('Error creating booking:', bookingError)
        // Don't throw - lead was created successfully
        // We can follow up manually to schedule
      }
    }

    // TODO: Send email notifications
    // - Email to team (new lead + booking)
    // - Email to lead (confirmation)

    // Log activity
    await supabase.from('activities').insert({
      lead_id: lead.id,
      activity_type: 'booking_submitted',
      title: 'Strategy call booking submitted',
      description: `Lead score: ${score} (${status})`,
      occurred_at: new Date().toISOString(),
    })

    // Revalidate relevant paths
    revalidatePath('/dashboard/crm/leads')
    revalidatePath('/dashboard/calendar')

    return {
      success: true,
      leadId: lead.id,
      score: score,
      status: status,
    }
  } catch (error) {
    console.error('Error in submitBooking:', error)

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

// Get available booking slots (placeholder for calendar integration)
export async function getAvailableSlots(date: string) {
  // TODO: Integrate with Cal.com or Calendly API
  // For now, return mock available slots

  const slots = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ]

  return {
    success: true,
    slots,
  }
}

// Cancel a booking
export async function cancelBooking(bookingId: string, reason?: string) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        notes: reason || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)

    if (error) throw error

    // TODO: Send cancellation email
    // TODO: Update calendar event

    revalidatePath('/dashboard/calendar')

    return { success: true }
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return {
      success: false,
      error: 'Failed to cancel booking',
    }
  }
}

// Reschedule a booking
export async function rescheduleBooking(
  bookingId: string,
  newScheduledAt: string
) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { error } = await supabase
      .from('bookings')
      .update({
        scheduled_at: newScheduledAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)

    if (error) throw error

    // TODO: Send reschedule email
    // TODO: Update calendar event

    revalidatePath('/dashboard/calendar')

    return { success: true }
  } catch (error) {
    console.error('Error rescheduling booking:', error)
    return {
      success: false,
      error: 'Failed to reschedule booking',
    }
  }
}

// Mark booking as completed
export async function completeBooking(bookingId: string, notes?: string) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('lead_id')
      .eq('id', bookingId)
      .single()

    if (fetchError) throw fetchError

    // Update booking status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'completed',
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)

    if (updateError) throw updateError

    // Update lead status
    await supabase
      .from('leads')
      .update({ status: 'contacted' })
      .eq('id', booking.lead_id)

    // Log activity
    await supabase.from('activities').insert({
      lead_id: booking.lead_id,
      activity_type: 'call',
      title: 'Discovery call completed',
      description: notes || 'Strategy call completed',
      occurred_at: new Date().toISOString(),
    })

    revalidatePath('/dashboard/calendar')
    revalidatePath('/dashboard/crm/leads')

    return { success: true }
  } catch (error) {
    console.error('Error completing booking:', error)
    return {
      success: false,
      error: 'Failed to mark booking as completed',
    }
  }
}
