'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Get all leads with optional filtering
export async function getLeads(filters?: {
  status?: string
  assignedTo?: string
  search?: string
}) {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters?.assignedTo) {
      query = query.eq('assigned_to', filters.assignedTo)
    }

    if (filters?.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
      )
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching leads:', error)
    return {
      success: false,
      error: 'Failed to fetch leads',
    }
  }
}

// Get single lead by ID
export async function getLead(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Also get related activities
    const { data: activities } = await supabase
      .from('activities')
      .select('*')
      .eq('lead_id', id)
      .order('occurred_at', { ascending: false })

    return {
      success: true,
      data: {
        ...data,
        activities: activities || [],
      },
    }
  } catch (error) {
    console.error('Error fetching lead:', error)
    return {
      success: false,
      error: 'Failed to fetch lead',
    }
  }
}

// Create new lead
export async function createLead(data: {
  company_name: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  annual_revenue_range?: string
  employee_count_range?: string
  primary_challenge?: string
  budget_range?: string
  decision_authority?: string
  source?: string
}) {
  try {
    const supabase = await createClient()

    // Check if lead meets ideal criteria (for manually created leads, default to true)
    const meetsIdealCriteria = true

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        company_name: data.company_name,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        annual_revenue_range: data.annual_revenue_range,
        employee_count_range: data.employee_count_range,
        primary_challenge: data.primary_challenge,
        budget_range: data.budget_range,
        decision_authority: data.decision_authority,
        source: data.source || 'direct',
        status: 'new',
        meets_ideal_criteria: meetsIdealCriteria,
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/crm/leads')

    return {
      success: true,
      data: lead,
    }
  } catch (error) {
    console.error('Error creating lead:', error)
    return {
      success: false,
      error: 'Failed to create lead',
    }
  }
}

// Update lead status
export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('leads')
      .update({
        status,
        [`${status}_at`]: new Date().toISOString(),
      })
      .eq('id', leadId)

    if (error) throw error

    // Log activity
    await supabase.from('activities').insert({
      lead_id: leadId,
      activity_type: 'status_change',
      title: `Lead status changed to ${status}`,
      occurred_at: new Date().toISOString(),
    })

    revalidatePath('/dashboard/crm/leads')
    revalidatePath(`/dashboard/crm/leads/${leadId}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating lead status:', error)
    return {
      success: false,
      error: 'Failed to update lead status',
    }
  }
}

// Assign lead to team member
export async function assignLead(leadId: string, userId: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('leads')
      .update({ assigned_to: userId })
      .eq('id', leadId)

    if (error) throw error

    // Log activity
    await supabase.from('activities').insert({
      lead_id: leadId,
      activity_type: 'assignment',
      title: 'Lead assigned',
      occurred_at: new Date().toISOString(),
    })

    revalidatePath('/dashboard/crm/leads')
    revalidatePath(`/dashboard/crm/leads/${leadId}`)

    return { success: true }
  } catch (error) {
    console.error('Error assigning lead:', error)
    return {
      success: false,
      error: 'Failed to assign lead',
    }
  }
}

// Add note/activity to lead
export async function addLeadActivity(
  leadId: string,
  data: {
    type: string
    title: string
    description?: string
  }
) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('activities').insert({
      lead_id: leadId,
      activity_type: data.type,
      title: data.title,
      description: data.description,
      occurred_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath(`/dashboard/crm/leads/${leadId}`)

    return { success: true }
  } catch (error) {
    console.error('Error adding activity:', error)
    return {
      success: false,
      error: 'Failed to add activity',
    }
  }
}

// Convert lead to client
export async function convertLeadToClient(leadId: string) {
  try {
    const supabase = await createClient()

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()

    if (leadError) throw leadError

    // Create client record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        company_name: lead.company_name,
        website: lead.website,
        industry: lead.industry,
        employee_count_range: lead.employee_count_range,
        status: 'onboarding',
      })
      .select()
      .single()

    if (clientError) throw clientError

    // Create contact/profile for the lead
    const { error: contactError } = await supabase.from('contacts').insert({
      client_id: client.id,
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      job_title: lead.job_title,
      is_primary: true,
    })

    if (contactError) throw contactError

    // Update lead status
    await supabase
      .from('leads')
      .update({
        status: 'converted',
        converted_at: new Date().toISOString(),
      })
      .eq('id', leadId)

    // Log activity
    await supabase.from('activities').insert({
      lead_id: leadId,
      client_id: client.id,
      activity_type: 'conversion',
      title: 'Lead converted to client',
      occurred_at: new Date().toISOString(),
    })

    revalidatePath('/dashboard/crm/leads')
    revalidatePath('/dashboard/crm/clients')

    return {
      success: true,
      clientId: client.id,
    }
  } catch (error) {
    console.error('Error converting lead:', error)
    return {
      success: false,
      error: 'Failed to convert lead to client',
    }
  }
}

// Delete lead
export async function deleteLead(leadId: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('leads').delete().eq('id', leadId)

    if (error) throw error

    revalidatePath('/dashboard/crm/leads')
    redirect('/dashboard/crm/leads')
  } catch (error) {
    console.error('Error deleting lead:', error)
    return {
      success: false,
      error: 'Failed to delete lead',
    }
  }
}
