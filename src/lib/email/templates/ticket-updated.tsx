import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface TicketUpdatedEmailProps {
  ticketNumber: string
  subject: string
  updateType: 'status' | 'comment'
  newStatus?: string
  comment?: string
  commentAuthor?: string
  ticketUrl: string
  recipientName: string
}

export default function TicketUpdatedEmail({
  ticketNumber,
  subject,
  updateType,
  newStatus,
  comment,
  commentAuthor,
  ticketUrl,
  recipientName,
}: TicketUpdatedEmailProps) {
  const statusLabels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    waiting_client: 'Waiting on Client',
    resolved: 'Resolved',
    closed: 'Closed',
  }

  return (
    <Html>
      <Head />
      <Preview>
        {updateType === 'status'
          ? `Ticket ${ticketNumber} status updated`
          : `New comment on ticket ${ticketNumber}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {updateType === 'status' ? 'Ticket Status Updated' : 'New Comment on Your Ticket'}
          </Heading>

          <Text style={text}>Hi {recipientName},</Text>

          <Text style={text}>
            {updateType === 'status'
              ? `The status of your ticket has been updated.`
              : `A new comment has been added to your ticket.`}
          </Text>

          <Section style={ticketInfo}>
            <Text style={ticketInfoLabel}>Ticket Number</Text>
            <Text style={ticketInfoValue}>{ticketNumber}</Text>

            <Text style={ticketInfoLabel}>Subject</Text>
            <Text style={ticketInfoValue}>{subject}</Text>

            {updateType === 'status' && newStatus && (
              <>
                <Text style={ticketInfoLabel}>New Status</Text>
                <Text style={statusValue}>
                  {statusLabels[newStatus] || newStatus}
                </Text>
              </>
            )}

            {updateType === 'comment' && comment && (
              <>
                <Text style={ticketInfoLabel}>
                  Comment from {commentAuthor}
                </Text>
                <Text style={commentValue}>{comment}</Text>
              </>
            )}
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={ticketUrl}>
              View Ticket
            </Button>
          </Section>

          <Text style={footer}>
            {updateType === 'status' && newStatus === 'resolved'
              ? 'If your issue is resolved, no further action is needed. If you need additional assistance, please reply to this ticket.'
              : 'You can view the full ticket details and add a response through your client portal.'}
          </Text>

          <Text style={footer}>
            — The Continu8 Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#0F1419',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#1a1f26',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  maxWidth: '600px',
}

const h1 = {
  color: '#F8F9FA',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  margin: '0 0 30px',
}

const text = {
  color: '#c9d1d9',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const ticketInfo = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const ticketInfoLabel = {
  color: '#7a8a9a',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '16px 0 4px',
}

const ticketInfoValue = {
  color: '#F8F9FA',
  fontSize: '14px',
  margin: '0 0 8px',
}

const statusValue = {
  color: '#6366F1',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
}

const commentValue = {
  color: '#c9d1d9',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 8px',
  padding: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  borderLeft: '3px solid #6366F1',
  whiteSpace: 'pre-wrap' as const,
}

const buttonContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#6366F1',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const footer = {
  color: '#7a8a9a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '16px 0 0',
}
