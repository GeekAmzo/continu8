import { GlassPanel } from '@/components/shared/glass-panel'
import { UserCog } from 'lucide-react'

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage team members, roles, and permissions
        </p>
      </div>

      <GlassPanel className="min-h-[400px] flex flex-col items-center justify-center">
        <UserCog className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Team Administration</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Add team members with different roles (Admin, Sales, Support), manage permissions, and
          track team activity across CRM and ticketing systems.
        </p>
      </GlassPanel>
    </div>
  )
}
