import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Building2, Plus } from 'lucide-react'
import Link from 'next/link'

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active client relationships
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/crm/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <GlassPanel className="min-h-[400px] flex flex-col items-center justify-center">
        <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Client Management</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Track active clients, contracts, and relationships. Convert qualified leads to clients
          and manage ongoing engagements.
        </p>
        <Button variant="outline" asChild>
          <Link href="/dashboard/crm/leads">View Leads to Convert</Link>
        </Button>
      </GlassPanel>
    </div>
  )
}
