'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import {
  CreateTicketSchema,
  UpdateTicketSchema,
  CreateCommentSchema,
} from '@/lib/validations/tickets'

// Get all tickets with filters
export async function getTickets(filters?: {
  status?: string
  priority?: string
  assigned_to?: string
  client_id?: string
  search?: string
}) {
  const supabase = await createClient()

  let query = supabase
    .from('tickets')
    .select(`
      *,
      client:clients(id, company_name),
      created_by_user:profiles!created_by(id, full_name, email)
    `)
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.priority && filters.priority !== 'all') {
    query = query.eq('priority', filters.priority)
  }

  if (filters?.assigned_to) {
    query = query.eq('assigned_to', filters.assigned_to)
  }

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  if (filters?.search) {
    query = query.or(`subject.ilike.%${filters.search}%,ticket_number.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tickets:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Get single ticket with comments
export async function getTicket(id: string) {
  const supabase = await createClient()

  const { data: ticket, error: ticketError } = await supabase
    .from('tickets')
    .select(`
      *,
      client:clients(id, company_name),
      created_by_user:profiles!created_by(id, full_name, email, avatar_url)
    `)
    .eq('id', id)
    .single()

  if (ticketError) {
    return { success: false, error: ticketError.message }
  }

  // Get comments
  const { data: comments, error: commentsError } = await supabase
    .from('ticket_comments')
    .select(`
      *,
      author:profiles(id, full_name, email, avatar_url)
    `)
    .eq('ticket_id', id)
    .order('created_at', { ascending: true })

  if (commentsError) {
    console.error('Error fetching comments:', commentsError)
  }

  // Get attachments
  const { data: attachments, error: attachmentsError } = await supabase
    .from('ticket_attachments')
    .select('*')
    .eq('ticket_id', id)
    .order('created_at', { ascending: false })

  if (attachmentsError) {
    console.error('Error fetching attachments:', attachmentsError)
  }

  return {
    success: true,
    data: {
      ...ticket,
      comments: comments || [],
      attachments: attachments || [],
    },
  }
}

// Create a new ticket
export async function createTicket(data: z.infer<typeof CreateTicketSchema>) {
  const supabase = await createClient()

  // Validate input
  const validated = CreateTicketSchema.parse(data)

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, id')
    .eq('id', user.id)
    .single()

  // If client is creating ticket, set client_id from their profile
  let client_id = validated.client_id

  if (profile?.role === 'client') {
    // Get client_id from contacts table
    const { data: contact } = await supabase
      .from('contacts')
      .select('client_id')
      .eq('profile_id', user.id)
      .single()

    if (contact) {
      client_id = contact.client_id
    }
  }

  // Generate ticket number
  const { count } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })

  const ticketNumber = `TKT-${String((count || 0) + 1).padStart(5, '0')}`

  // Calculate SLA deadline (24h for urgent, 48h for high, 72h for medium, 5 days for low)
  const slaHours = {
    urgent: 24,
    high: 48,
    medium: 72,
    low: 120,
  }
  const slaDeadline = new Date()
  slaDeadline.setHours(slaDeadline.getHours() + slaHours[validated.priority])

  // Create ticket
  const { data: ticket, error } = await supabase
    .from('tickets')
    .insert({
      ticket_number: ticketNumber,
      subject: validated.subject,
      description: validated.description,
      priority: validated.priority,
      category: validated.category,
      client_id,
      created_by: user.id,
      status: 'open',
      sla_deadline: slaDeadline.toISOString(),
    })
    .select(`
      *,
      client:clients(company_name),
      created_by_user:profiles!created_by(full_name, email)
    `)
    .single()

  if (error) {
    console.error('Error creating ticket:', error)
    return { success: false, error: error.message }
  }

  // Send email notifications
  try {
    const { sendTicketCreatedEmails } = await import('@/lib/email/send')
    await sendTicketCreatedEmails(ticket)
  } catch (emailError) {
    console.error('Error sending ticket emails:', emailError)
    // Don't fail the ticket creation if email fails
  }

  // Revalidate tickets list
  revalidatePath('/dashboard/tickets')
  revalidatePath('/portal/tickets')

  return { success: true, data: ticket }
}

// Update ticket
export async function updateTicket(id: string, data: z.infer<typeof UpdateTicketSchema>) {
  const supabase = await createClient()

  // Validate input
  const validated = UpdateTicketSchema.parse(data)

  // Get current user for authorization
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  // Update ticket
  const { data: ticket, error } = await supabase
    .from('tickets')
    .update({
      ...validated,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      client:clients(company_name),
      created_by_user:profiles!created_by(id, full_name, email)
    `)
    .single()

  if (error || !ticket) {
    console.error('Error updating ticket:', error)
    return { success: false, error: error?.message || 'Failed to update ticket' }
  }

  // Log activity if status changed
  if (validated.status) {
    await supabase.from('activities').insert({
      type: 'ticket_status_changed',
      title: `Ticket status changed to ${validated.status}`,
      description: `Ticket #${ticket.ticket_number} status changed`,
      ticket_id: id,
      user_id: user.id,
    })

    // Send email notification to client
    const createdByUser = Array.isArray(ticket.created_by_user)
      ? ticket.created_by_user[0]
      : ticket.created_by_user

    if (createdByUser?.email) {
      try {
        const { sendTicketStatusUpdateEmail } = await import('@/lib/email/send')
        await sendTicketStatusUpdateEmail(
          {
            id: ticket.id,
            ticket_number: ticket.ticket_number,
            subject: ticket.subject,
            status: ticket.status,
          },
          createdByUser.email,
          createdByUser.full_name
        )
      } catch (emailError) {
        console.error('Error sending status update email:', emailError)
      }
    }
  }

  // Revalidate
  revalidatePath('/dashboard/tickets')
  revalidatePath(`/dashboard/tickets/${id}`)
  revalidatePath('/portal/tickets')
  revalidatePath(`/portal/tickets/${id}`)

  return { success: true, data: ticket }
}

// Add comment to ticket
export async function createTicketComment(data: z.infer<typeof CreateCommentSchema>) {
  const supabase = await createClient()

  // Validate input
  const validated = CreateCommentSchema.parse(data)

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // Clients cannot create internal comments
  const isInternal = profile?.role !== 'client' && validated.is_internal

  // Create comment
  const { data: comment, error } = await supabase
    .from('ticket_comments')
    .insert({
      ticket_id: validated.ticket_id,
      content: validated.content,
      author_id: user.id,
      is_internal: isInternal,
    })
    .select(`
      *,
      author:profiles(id, full_name, email, avatar_url)
    `)
    .single()

  if (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: error.message }
  }

  // Update ticket's updated_at timestamp
  await supabase
    .from('tickets')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', validated.ticket_id)

  // Send email notification if comment is not internal
  if (!isInternal) {
    // Get ticket details for email
    const { data: ticket } = await supabase
      .from('tickets')
      .select(`
        id,
        ticket_number,
        subject,
        created_by_user:profiles!created_by(id, full_name, email)
      `)
      .eq('id', validated.ticket_id)
      .single()

    const createdByUser = Array.isArray(ticket?.created_by_user)
      ? ticket.created_by_user[0]
      : ticket?.created_by_user

    if (ticket && createdByUser?.email) {
      try {
        const { sendTicketCommentEmail } = await import('@/lib/email/send')
        await sendTicketCommentEmail(
          {
            id: ticket.id,
            ticket_number: ticket.ticket_number,
            subject: ticket.subject,
          },
          {
            content: comment.content,
            author: comment.author,
          },
          createdByUser.email,
          createdByUser.full_name
        )
      } catch (emailError) {
        console.error('Error sending comment email:', emailError)
      }
    }
  }

  // Revalidate
  revalidatePath('/dashboard/tickets')
  revalidatePath(`/dashboard/tickets/${validated.ticket_id}`)
  revalidatePath('/portal/tickets')
  revalidatePath(`/portal/tickets/${validated.ticket_id}`)

  return { success: true, data: comment }
}

// Upload attachment
export async function uploadTicketAttachment(
  ticketId: string,
  formData: FormData
): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const file = formData.get('file') as File
  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: 'File size must be less than 10MB' }
  }

  // Generate unique file name
  const fileExt = file.name.split('.').pop()
  const fileName = `${ticketId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('ticket-attachments')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return { success: false, error: uploadError.message }
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('ticket-attachments').getPublicUrl(fileName)

  // Create attachment record
  const { data: attachment, error: dbError } = await supabase
    .from('ticket_attachments')
    .insert({
      ticket_id: ticketId,
      file_name: file.name,
      file_path: fileName,
      file_url: publicUrl,
      file_size: file.size,
      file_type: file.type,
      uploaded_by: user.id,
    })
    .select()
    .single()

  if (dbError) {
    console.error('Error creating attachment record:', dbError)
    // Clean up uploaded file
    await supabase.storage.from('ticket-attachments').remove([fileName])
    return { success: false, error: dbError.message }
  }

  // Revalidate
  revalidatePath(`/dashboard/tickets/${ticketId}`)
  revalidatePath(`/portal/tickets/${ticketId}`)

  return { success: true, data: attachment }
}

// Get tickets for current user (client portal)
export async function getMyTickets() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  // Get client_id from contacts table
  const { data: contact } = await supabase
    .from('contacts')
    .select('client_id')
    .eq('profile_id', user.id)
    .single()

  if (!contact) {
    return { success: false, error: 'No client association found' }
  }

  return getTickets({ client_id: contact.client_id })
}
