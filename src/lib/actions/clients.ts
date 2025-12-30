'use server'

import { revalidatePath } from 'next/cache'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'

// Get all clients with optional filtering
export async function getClients(filters?: {
  status?: string
  search?: string
}) {
  try {
    const supabase = await createSupabaseClient()

    let query = supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters?.search) {
      query = query.or(
        `company_name.ilike.%${filters.search}%`
      )
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching clients:', error)
    return {
      success: false,
      error: 'Failed to fetch clients',
    }
  }
}

// Get single client by ID
export async function getClient(id: string) {
  try {
    const supabase = await createSupabaseClient()

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Also get related contacts
    const { data: contacts } = await supabase
      .from('contacts')
      .select('*')
      .eq('client_id', id)

    // And tickets
    const { data: tickets } = await supabase
      .from('tickets')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false })

    return {
      success: true,
      data: {
        ...data,
        contacts: contacts || [],
        tickets: tickets || [],
      },
    }
  } catch (error) {
    console.error('Error fetching client:', error)
    return {
      success: false,
      error: 'Failed to fetch client',
    }
  }
}

// Create new client
export async function createClient(data: {
  company_name: string
  company_size?: string
  industry?: string
  website?: string
  contract_type?: string
  monthly_retainer?: number
  contract_start_date?: string
  contract_end_date?: string
}) {
  try {
    const supabase = await createSupabaseClient()

    const { data: client, error } = await supabase
      .from('clients')
      .insert({
        company_name: data.company_name,
        company_size: data.company_size,
        industry: data.industry,
        website: data.website,
        contract_type: data.contract_type,
        monthly_retainer: data.monthly_retainer,
        contract_start_date: data.contract_start_date,
        contract_end_date: data.contract_end_date,
        status: 'active',
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/crm/clients')

    return {
      success: true,
      data: client,
    }
  } catch (error) {
    console.error('Error creating client:', error)
    return {
      success: false,
      error: 'Failed to create client',
    }
  }
}

// Update client
export async function updateClient(
  clientId: string,
  data: Partial<{
    company_name: string
    company_size: string
    industry: string
    website: string
    contract_type: string
    monthly_retainer: number
    contract_start_date: string
    contract_end_date: string
    status: string
    health_score: number
  }>
) {
  try {
    const supabase = await createSupabaseClient()

    const { error } = await supabase
      .from('clients')
      .update(data)
      .eq('id', clientId)

    if (error) throw error

    revalidatePath('/dashboard/crm/clients')
    revalidatePath(`/dashboard/crm/clients/${clientId}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating client:', error)
    return {
      success: false,
      error: 'Failed to update client',
    }
  }
}

// Delete client
export async function deleteClient(clientId: string) {
  try {
    const supabase = await createSupabaseClient()

    const { error } = await supabase.from('clients').delete().eq('id', clientId)

    if (error) throw error

    revalidatePath('/dashboard/crm/clients')

    return { success: true }
  } catch (error) {
    console.error('Error deleting client:', error)
    return {
      success: false,
      error: 'Failed to delete client',
    }
  }
}
