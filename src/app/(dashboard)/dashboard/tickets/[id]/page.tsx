import { notFound } from 'next/navigation'
import { getTicket } from '@/lib/actions/tickets'
import { TicketDetail } from '@/components/tickets/ticket-detail'

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const result = await getTicket(params.id)

  if (!result.success || !result.data) {
    notFound()
  }

  return <TicketDetail ticket={result.data} isTeamView={true} />
}
