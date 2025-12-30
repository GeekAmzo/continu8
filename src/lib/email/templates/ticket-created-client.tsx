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

interface TicketCreatedClientEmailProps {
  ticketNumber: string
  subject: string
  description: string
  priority: string
  ticketUrl: string
  clientName: string
}

export default function TicketCreatedClientEmail({
  ticketNumber,
  subject,
  description,
  priority,
  ticketUrl,
  clientName,
}: TicketCreatedClientEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your support ticket has been created - {ticketNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Support Ticket Created</Heading>

          <Text style={text}>Hi {clientName},</Text>

          <Text style={text}>
            Your support ticket has been successfully created. Our team will review it and respond
            as soon as possible.
          </Text>

          <Section style={ticketInfo}>
            <Text style={ticketInfoLabel}>Ticket Number</Text>
            <Text style={ticketInfoValue}>{ticketNumber}</Text>

            <Text style={ticketInfoLabel}>Subject</Text>
            <Text style={ticketInfoValue}>{subject}</Text>

            <Text style={ticketInfoLabel}>Priority</Text>
            <Text style={ticketInfoValue}>{priority}</Text>

            <Text style={ticketInfoLabel}>Description</Text>
            <Text style={ticketInfoValue}>{description}</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={ticketUrl}>
              View Ticket
            </Button>
          </Section>

          <Text style={footer}>
            You can track the progress of your ticket and add additional information through your
            client portal.
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
