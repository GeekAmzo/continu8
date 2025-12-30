import { GlassPanel } from '@/components/shared/glass-panel'
import { TrendingUp } from 'lucide-react'

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
        <p className="text-muted-foreground mt-1">
          Visualize and manage your sales pipeline with drag-and-drop deals
        </p>
      </div>

      <GlassPanel className="min-h-[500px] flex flex-col items-center justify-center">
        <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Sales Pipeline</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Kanban-style pipeline view with drag-and-drop deals across stages: Discovery → Qualified
          → Proposal → Negotiation → Closed
        </p>
      </GlassPanel>
    </div>
  )
}
