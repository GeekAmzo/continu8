import { Resend } from 'resend'
import { render } from '@react-email/components'

// Initialize Resend (will need RESEND_API_KEY in .env)
const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'Continu8 Support <support@continu8.co.za>'
const TEAM_EMAIL = 'team@continu8.co.za'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: React.ReactElement
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  try {
    const html = await render(react)

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Ticket-specific email helpers
export async function sendTicketCreatedEmails(ticket: {
  id: string
  ticket_number: string
  subject: string
  description: string
  priority: string
  category?: string
  client?: { company_name: string }
  created_by_user?: { full_name: string; email: string }
}) {
  const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/tickets/${ticket.id}`
  const teamTicketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tickets/${ticket.id}`

  // Lazy load email templates to avoid circular dependencies
  const { default: TicketCreatedClientEmail } = await import(
    './templates/ticket-created-client'
  )
  const { default: TicketCreatedTeamEmail } = await import('./templates/ticket-created-team')

  // Send email to client
  if (ticket.created_by_user?.email) {
    await sendEmail({
      to: ticket.created_by_user.email,
      subject: `Support Ticket Created - ${ticket.ticket_number}`,
      react: TicketCreatedClientEmail({
        ticketNumber: ticket.ticket_number,
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        ticketUrl,
        clientName: ticket.created_by_user.full_name,
      }),
    })
  }

  // Send email to team
  await sendEmail({
    to: TEAM_EMAIL,
    subject: `New Support Ticket: ${ticket.subject} [${ticket.ticket_number}]`,
    react: TicketCreatedTeamEmail({
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      category: ticket.category,
      clientName: ticket.client?.company_name || 'Unknown',
      ticketUrl: teamTicketUrl,
      createdBy: ticket.created_by_user?.full_name || 'Unknown',
    }),
  })
}

export async function sendTicketStatusUpdateEmail(
  ticket: {
    id: string
    ticket_number: string
    subject: string
    status: string
  },
  recipientEmail: string,
  recipientName: string
) {
  const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/tickets/${ticket.id}`

  const { default: TicketUpdatedEmail } = await import('./templates/ticket-updated')

  await sendEmail({
    to: recipientEmail,
    subject: `Ticket ${ticket.ticket_number} Status Updated`,
    react: TicketUpdatedEmail({
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      updateType: 'status',
      newStatus: ticket.status,
      ticketUrl,
      recipientName,
    }),
  })
}

export async function sendTicketCommentEmail(
  ticket: {
    id: string
    ticket_number: string
    subject: string
  },
  comment: {
    content: string
    author?: { full_name: string }
  },
  recipientEmail: string,
  recipientName: string
) {
  const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/tickets/${ticket.id}`

  const { default: TicketUpdatedEmail } = await import('./templates/ticket-updated')

  await sendEmail({
    to: recipientEmail,
    subject: `New Comment on Ticket ${ticket.ticket_number}`,
    react: TicketUpdatedEmail({
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      updateType: 'comment',
      comment: comment.content,
      commentAuthor: comment.author?.full_name || 'Support Team',
      ticketUrl,
      recipientName,
    }),
  })
}
