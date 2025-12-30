import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getMyTickets } from '@/lib/actions/tickets'
import { TicketList } from '@/components/tickets/ticket-list'

export default async function PortalTicketsPage({
  searchParams,
}: {
  searchParams: { status?: string; priority?: string }
}) {
  const result = await getMyTickets()
  const tickets = result.success ? result.data : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your support requests
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/tickets/new">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      <TicketList tickets={tickets || []} basePath="/portal/tickets" />
    </div>
  )
}
