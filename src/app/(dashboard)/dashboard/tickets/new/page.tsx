import { GlassPanel } from '@/components/shared/glass-panel'
import { TicketForm } from '@/components/tickets/ticket-form'

export default function NewTicketPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Ticket</h1>
        <p className="text-muted-foreground mt-1">
          Submit a support request on behalf of a client
        </p>
      </div>

      <GlassPanel>
        <TicketForm showClientSelect={true} />
      </GlassPanel>
    </div>
  )
}
