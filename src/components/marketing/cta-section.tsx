'use client'

import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/animated-section'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CtaSectionProps {
  title: string
  description?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
}

export function CtaSection({
  title,
  description,
  primaryCta = { text: 'Get in Touch', href: 'mailto:amrish@geek247.co.za' },
  secondaryCta,
}: CtaSectionProps) {
  return (
    <section className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel p-12 text-center">
          <AnimatedSection>
            <h2 className="mb-4">{title}</h2>
          </AnimatedSection>

          {description && (
            <AnimatedSection delay={0.1}>
              <p className="mb-8 text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                {description}
              </p>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryCta && (
                <Button size="lg" asChild className="group">
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
