import { GlassPanel } from '@/components/shared/glass-panel'
import { TicketForm } from '@/components/tickets/ticket-form'

export default function NewPortalTicketPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Support Ticket</h1>
        <p className="text-muted-foreground mt-1">
          Submit a new support request to our team
        </p>
      </div>

      <GlassPanel>
        <TicketForm />
      </GlassPanel>
    </div>
  )
}
