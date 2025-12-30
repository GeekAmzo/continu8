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

interface TicketCreatedTeamEmailProps {
  ticketNumber: string
  subject: string
  description: string
  priority: string
  category?: string
  clientName: string
  ticketUrl: string
  createdBy: string
}

export default function TicketCreatedTeamEmail({
  ticketNumber,
  subject,
  description,
  priority,
  category,
  clientName,
  ticketUrl,
  createdBy,
}: TicketCreatedTeamEmailProps) {
  const priorityColor = {
    urgent: '#ef4444',
    high: '#f97316',
    medium: '#3b82f6',
    low: '#6b7280',
  }[priority.toLowerCase()] || '#6b7280'

  return (
    <Html>
      <Head />
      <Preview>New support ticket: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Support Ticket</Heading>

          <Section style={{
            ...priorityBadge,
            backgroundColor: priorityColor + '20',
            borderColor: priorityColor + '40',
          }}>
            <Text style={{
              ...priorityText,
              color: priorityColor,
            }}>
              {priority.toUpperCase()} PRIORITY
            </Text>
          </Section>

          <Section style={ticketInfo}>
            <Text style={ticketInfoLabel}>Ticket Number</Text>
            <Text style={ticketInfoValue}>{ticketNumber}</Text>

            <Text style={ticketInfoLabel}>Client</Text>
            <Text style={ticketInfoValue}>{clientName}</Text>

            <Text style={ticketInfoLabel}>Created By</Text>
            <Text style={ticketInfoValue}>{createdBy}</Text>

            {category && (
              <>
                <Text style={ticketInfoLabel}>Category</Text>
                <Text style={ticketInfoValue}>{category.replace('_', ' ')}</Text>
              </>
            )}

            <Text style={ticketInfoLabel}>Subject</Text>
            <Text style={ticketInfoValue}>{subject}</Text>

            <Text style={ticketInfoLabel}>Description</Text>
            <Text style={ticketInfoValue}>{description}</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={ticketUrl}>
              View & Assign Ticket
            </Button>
          </Section>

          <Text style={footer}>
            This ticket requires assignment and response according to SLA guidelines.
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
  margin: '0 0 24px',
}

const priorityBadge = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '8px 16px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const priorityText = {
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1px',
  margin: '0',
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
