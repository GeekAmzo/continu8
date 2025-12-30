import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Users, Building2, Ticket, TrendingUp, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data - will be replaced with real data from Supabase
  const stats = [
    {
      name: 'New Leads',
      value: '12',
      change: '+4.75%',
      changeType: 'positive' as const,
      icon: Users,
      href: '/dashboard/crm/leads',
    },
    {
      name: 'Active Clients',
      value: '24',
      change: '+2.02%',
      changeType: 'positive' as const,
      icon: Building2,
      href: '/dashboard/crm/clients',
    },
    {
      name: 'Open Tickets',
      value: '8',
      change: '-12.5%',
      changeType: 'negative' as const,
      icon: Ticket,
      href: '/dashboard/tickets',
    },
    {
      name: 'Pipeline Value',
      value: 'R1.2M',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      href: '/dashboard/crm/pipeline',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'lead',
      title: 'New lead submitted',
      description: 'John Smith from Acme Corp',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'ticket',
      title: 'Ticket resolved',
      description: 'Support ticket #234 closed',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'deal',
      title: 'Deal moved to proposal',
      description: 'Tech Solutions Ltd - R250k',
      time: '2 hours ago',
    },
    {
      id: 4,
      type: 'booking',
      title: 'Strategy call scheduled',
      description: 'Tomorrow at 10:00 AM',
      time: '3 hours ago',
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      client: 'Sarah Johnson',
      company: 'Digital Innovations',
      time: 'Today, 2:00 PM',
      type: 'Discovery Call',
    },
    {
      id: 2,
      client: 'Michael Chen',
      company: 'Growth Partners',
      time: 'Tomorrow, 10:00 AM',
      type: 'Strategy Call',
    },
    {
      id: 3,
      client: 'Emma Williams',
      company: 'Scale Up Inc',
      time: 'Tomorrow, 3:00 PM',
      type: 'Follow-up',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/crm/leads/new">
              <Plus className="mr-2 h-4 w-4" />
              New Lead
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <GlassPanel className="hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p
                      className={`text-sm mt-2 ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </GlassPanel>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <GlassPanel>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/activity">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-white/[0.06] last:border-0 last:pb-0"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Upcoming Bookings */}
        <GlassPanel>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Upcoming Calls</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/calendar">
                View Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-start gap-4 pb-4 border-b border-white/[0.06] last:border-0 last:pb-0"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{booking.client}</p>
                  <p className="text-sm text-muted-foreground">{booking.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{booking.time}</p>
                    <span className="text-xs">•</span>
                    <span className="text-xs text-primary">{booking.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Quick Actions */}
      <GlassPanel>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/dashboard/crm/leads/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/dashboard/tickets/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/dashboard/crm/pipeline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Pipeline
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/dashboard/calendar">
              <Users className="mr-2 h-4 w-4" />
              Schedule Call
            </Link>
          </Button>
        </div>
      </GlassPanel>
    </div>
  )
}
