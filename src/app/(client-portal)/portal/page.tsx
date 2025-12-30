import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Ticket, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { getMyTickets } from '@/lib/actions/tickets'
import { cn } from '@/lib/utils'

export default async function PortalDashboardPage() {
  const result = await getMyTickets()
  const tickets = result.success ? result.data : []

  // Calculate stats
  const openTickets = tickets?.filter((t: any) => t.status === 'open').length || 0
  const inProgressTickets =
    tickets?.filter((t: any) => t.status === 'in_progress').length || 0
  const resolvedTickets = tickets?.filter((t: any) => t.status === 'resolved').length || 0

  const stats = [
    {
      label: 'Open Tickets',
      value: openTickets.toString(),
      icon: AlertCircle,
      color: 'text-blue-500',
    },
    {
      label: 'In Progress',
      value: inProgressTickets.toString(),
      icon: Clock,
      color: 'text-yellow-500',
    },
    {
      label: 'Resolved',
      value: resolvedTickets.toString(),
      icon: CheckCircle2,
      color: 'text-green-500',
    },
  ]

  // Get recent tickets (last 3)
  const recentTickets = tickets?.slice(0, 3) || []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your support tickets and account settings
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/tickets/new">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <GlassPanel key={stat.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={cn('opacity-80', stat.color)}>
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            </GlassPanel>
          )
        })}
      </div>

      {/* Recent Tickets */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Tickets</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/portal/tickets">View All</Link>
          </Button>
        </div>

        {recentTickets.length > 0 ? (
          <div className="space-y-3">
            {recentTickets.map((ticket: any) => (
              <Link
                key={ticket.id}
                href={`/portal/tickets/${ticket.id}`}
                className="block p-4 rounded-lg border border-white/[0.06] hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">
                        {ticket.ticket_number}
                      </span>
                    </div>
                    <h3 className="font-semibold truncate">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded-md',
                        ticket.status === 'open' &&
                          'bg-blue-500/10 text-blue-500',
                        ticket.status === 'in_progress' &&
                          'bg-yellow-500/10 text-yellow-500',
                        ticket.status === 'resolved' &&
                          'bg-green-500/10 text-green-500'
                      )}
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent tickets</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/portal/tickets/new">Create Your First Ticket</Link>
            </Button>
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
