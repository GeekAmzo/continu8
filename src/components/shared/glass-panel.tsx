import { cn } from '@/lib/utils'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'border-2 border-white/30 bg-black/90 p-6 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
