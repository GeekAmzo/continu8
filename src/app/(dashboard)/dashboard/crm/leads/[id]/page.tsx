import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Mail,
  Phone,
  Building2,
  Globe,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  ArrowLeft,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { getLead, updateLeadStatus, convertLeadToClient } from '@/lib/actions/leads'
import { notFound } from 'next/navigation'

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const result = await getLead(params.id)

  if (!result.success || !result.data) {
    notFound()
  }

  const lead = result.data

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
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Hot', color: 'bg-red-500/10 text-red-500 border-red-500/20' }
    if (score >= 60) return { label: 'Warm', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' }
    if (score >= 40) return { label: 'Qualified', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' }
    return { label: 'Cold', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
  }

  const scoreBadge = getScoreBadge(lead.lead_score || 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/crm/leads">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {lead.first_name} {lead.last_name}
            </h1>
            <p className="text-muted-foreground mt-1">{lead.company_name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Note
          </Button>
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <GlassPanel>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead Score</p>
                  <p className="text-2xl font-bold">{lead.lead_score || 0}</p>
                </div>
                <Badge variant="outline" className={scoreBadge.color}>
                  {scoreBadge.label}
                </Badge>
              </div>
            </GlassPanel>

            <GlassPanel>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="outline" className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </div>
            </GlassPanel>

            <GlassPanel>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Source</p>
                <p className="text-sm font-medium capitalize">
                  {lead.source?.replace('_', ' ')}
                </p>
              </div>
            </GlassPanel>
          </div>

          {/* Tabs */}
          <GlassPanel>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Job Title</p>
                        <p className="text-sm font-medium">{lead.job_title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{lead.company_name}</p>
                      </div>
                    </div>
                    {lead.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Website</p>
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {lead.website}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Industry</p>
                        <p className="text-sm font-medium">{lead.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Revenue</p>
                        <p className="text-sm font-medium">
                          {lead.annual_revenue_range?.replace('_', ' - ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="text-sm font-medium">
                          {lead.employee_count_range?.replace('_', ' - ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualification Details */}
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-semibold mb-4">Qualification Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Primary Challenge</p>
                      <p className="text-sm">
                        {lead.primary_challenge?.replace('_', ' ')}
                      </p>
                    </div>
                    {lead.specific_pain_points && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Specific Pain Points</p>
                        <p className="text-sm">{lead.specific_pain_points}</p>
                      </div>
                    )}
                    {lead.desired_outcomes && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Desired Outcomes</p>
                        <p className="text-sm">{lead.desired_outcomes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <div className="space-y-4">
                  {lead.activities && lead.activities.length > 0 ? (
                    lead.activities.map((activity: any) => (
                      <div
                        key={activity.id}
                        className="flex gap-4 pb-4 border-b border-white/5 last:border-0"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(activity.occurred_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      No activity yet
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <p className="text-center text-sm text-muted-foreground py-8">
                  No notes yet. Click "Add Note" to create one.
                </p>
              </TabsContent>
            </Tabs>
          </GlassPanel>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Actions */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Convert to Client
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline" disabled>
                <XCircle className="mr-2 h-4 w-4" />
                Mark as Lost
              </Button>
            </div>
          </GlassPanel>

          {/* Change Status */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>
            <Select defaultValue={lead.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </GlassPanel>

          {/* Timeline */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
              {lead.contacted_at && (
                <div>
                  <p className="text-muted-foreground">First Contact</p>
                  <p className="font-medium">
                    {new Date(lead.contacted_at).toLocaleDateString()}
                  </p>
                </div>
              )}
              {lead.qualified_at && (
                <div>
                  <p className="text-muted-foreground">Qualified</p>
                  <p className="font-medium">
                    {new Date(lead.qualified_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
