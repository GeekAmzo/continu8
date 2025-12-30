'use client'

import { GlassPanel } from '@/components/shared/glass-panel'
import { AnimatedSection } from '@/components/shared/animated-section'
import { Check, X } from 'lucide-react'

interface QualificationBlockProps {
  title?: string
  goodFit: string[]
  notGoodFit: string[]
}

export function QualificationBlock({
  title = "Who It's For / Who It's Not For",
  goodFit,
  notGoodFit,
}: QualificationBlockProps) {
  return (
    <section className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <h2 className="mb-12 text-center">{title}</h2>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Good Fit */}
          <AnimatedSection delay={0.1}>
            <GlassPanel className="h-full border-primary/20">
              <div className="mb-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">This is for you if...</h3>
              </div>
              <ul className="space-y-3">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start">
                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </AnimatedSection>

          {/* Not Good Fit */}
          <AnimatedSection delay={0.2}>
            <GlassPanel className="h-full border-destructive/20">
              <div className="mb-6">
                <div className="mb-4 inline-flex rounded-lg bg-destructive/10 p-3 text-destructive">
                  <X className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">This is NOT for you if...</h3>
              </div>
              <ul className="space-y-3">
                {notGoodFit.map((item) => (
                  <li key={item} className="flex items-start">
                    <X className="mr-3 h-5 w-5 flex-shrink-0 text-destructive" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
