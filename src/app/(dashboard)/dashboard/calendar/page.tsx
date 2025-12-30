import { GlassPanel } from '@/components/shared/glass-panel'
import { Calendar as CalendarIcon } from 'lucide-react'

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Manage strategy calls, meetings, and scheduled bookings
        </p>
      </div>

      <GlassPanel className="min-h-[500px] flex flex-col items-center justify-center">
        <CalendarIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Booking Calendar</h3>
        <p className="text-muted-foreground text-center max-w-md">
          View all scheduled strategy calls, manage availability, reschedule bookings, and track
          call outcomes. Integrates with Cal.com or Calendly for automated scheduling.
        </p>
      </GlassPanel>
    </div>
  )
}
