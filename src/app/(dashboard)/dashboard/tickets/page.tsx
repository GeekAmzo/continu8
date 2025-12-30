import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getTickets } from '@/lib/actions/tickets'
import { TicketList } from '@/components/tickets/ticket-list'

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: { status?: string; priority?: string; search?: string }
}) {
  const result = await getTickets({
    status: searchParams.status,
    priority: searchParams.priority,
    search: searchParams.search,
  })

  const tickets = result.success ? result.data : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage client support requests and track resolution progress
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tickets/new">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      <TicketList tickets={tickets || []} basePath="/dashboard/tickets" />
    </div>
  )
}
