'use client'

import { GlassPanel } from '@/components/shared/glass-panel'
import { AnimatedSection } from '@/components/shared/animated-section'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {features.map((feature, index) => {
        const Icon = (Icons as any)[feature.icon] as Icons.LucideIcon
        return (
          <AnimatedSection key={feature.title} delay={index * 0.1}>
            <GlassPanel className="h-full group hover:border-white/[0.12] transition-colors duration-300">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </GlassPanel>
          </AnimatedSection>
        )
      })}
    </div>
  )
}
