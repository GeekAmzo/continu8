'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  TrendingUp,
} from 'lucide-react'

import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Ticket {
  id: string
  ticket_number: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  sla_deadline: string | null
  client?: { company_name: string }
  assigned_to_user?: { full_name: string; email: string }
  created_by_user?: { full_name: string; email: string }
}

interface TicketListProps {
  tickets: Ticket[]
  basePath: string
}

const statusConfig = {
  open: { label: 'Open', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  in_progress: {
    label: 'In Progress',
    color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  },
  waiting_client: {
    label: 'Waiting',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  closed: { label: 'Closed', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
}

const priorityConfig = {
  low: { label: 'Low', color: 'text-gray-400' },
  medium: { label: 'Medium', color: 'text-blue-400' },
  high: { label: 'High', color: 'text-orange-400' },
  urgent: { label: 'Urgent', color: 'text-red-400' },
}

export function TicketList({ tickets, basePath }: TicketListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all' || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`${basePath}?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    router.push(`${basePath}?${params.toString()}`)
  }

  const isOverdue = (deadline: string | null) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <GlassPanel>
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <Select
            defaultValue={searchParams.get('status') || 'all'}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="waiting_client">Waiting</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={searchParams.get('priority') || 'all'}
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassPanel>

      {/* Tickets List */}
      {tickets.length === 0 ? (
        <GlassPanel className="min-h-[400px] flex flex-col items-center justify-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            No tickets match your current filters. Try adjusting your search criteria.
          </p>
        </GlassPanel>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const status = statusConfig[ticket.status]
            const priority = priorityConfig[ticket.priority]
            const overdue = isOverdue(ticket.sla_deadline)

            return (
              <Link key={ticket.id} href={`${basePath}/${ticket.id}`}>
                <GlassPanel className="hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-mono text-muted-foreground">
                              {ticket.ticket_number}
                            </span>
                            {overdue && (
                              <Badge
                                variant="outline"
                                className="bg-red-500/10 text-red-500 border-red-500/20"
                              >
                                Overdue
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {ticket.subject}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {ticket.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
                        {ticket.client && (
                          <span className="flex items-center gap-1">
                            <span className="text-xs">Client:</span>
                            <span className="font-medium">{ticket.client.company_name}</span>
                          </span>
                        )}
                        {ticket.assigned_to_user && (
                          <span className="flex items-center gap-1">
                            <span className="text-xs">Assigned to:</span>
                            <span className="font-medium">
                              {ticket.assigned_to_user.full_name}
                            </span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(ticket.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                      <Badge variant="outline" className={cn('border-white/10', priority.color)}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {priority.label}
                      </Badge>
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
