import { notFound } from 'next/navigation'
import { getTicket } from '@/lib/actions/tickets'
import { TicketDetail } from '@/components/tickets/ticket-detail'

export default async function PortalTicketDetailPage({ params }: { params: { id: string } }) {
  const result = await getTicket(params.id)

  if (!result.success || !result.data) {
    notFound()
  }

  // TODO: Add authorization check - ensure user can only view their own tickets

  return <TicketDetail ticket={result.data} isTeamView={false} />
}
