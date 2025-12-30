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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { getLeads } from '@/lib/actions/leads'

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string }
}) {
  const result = await getLeads({
    status: searchParams.status,
    search: searchParams.search,
  })

  const leads = result.success ? result.data : []

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      qualified: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      proposal: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      negotiation: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      won: 'bg-green-500/10 text-green-500 border-green-500/20',
      lost: 'bg-red-500/10 text-red-500 border-red-500/20',
      converted: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      hot: 'bg-red-500/10 text-red-500 border-red-500/20',
      warm: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      cold: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Hot', color: 'bg-red-500/10 text-red-500 border-red-500/20' }
    if (score >= 60) return { label: 'Warm', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' }
    if (score >= 40) return { label: 'Qualified', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' }
    return { label: 'Cold', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and qualify leads from your marketing channels
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/crm/leads/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <GlassPanel>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-10"
              defaultValue={searchParams.search}
            />
          </div>
          <Select defaultValue={searchParams.status || 'all'}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </GlassPanel>

      {/* Leads Table */}
      <GlassPanel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" className="-ml-4">
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Revenue Range</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads && leads.length > 0 ? (
              leads.map((lead: any) => {
                const scoreBadge = getScoreBadge(lead.lead_score || 0)
                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/crm/leads/${lead.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {lead.first_name} {lead.last_name}
                      </Link>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{lead.company_name}</div>
                      <div className="text-sm text-muted-foreground">{lead.industry}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={scoreBadge.color}>
                          {lead.lead_score || 0} - {scoreBadge.label}
                        </Badge>
                        {lead.meets_ideal_criteria === false && (
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">
                            Below threshold
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.annual_revenue_range?.replace('_', '-')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground capitalize">
                      {lead.source?.replace('_', ' ')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/crm/leads/${lead.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No leads found. Create your first lead to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </GlassPanel>
    </div>
  )
}
