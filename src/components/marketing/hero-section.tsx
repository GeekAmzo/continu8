'use client'

import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/animated-section'
import { AIProcessFlow, AINetworkGrid } from '@/components/shared/ai-process-flow'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showVisualization?: boolean
}

export function HeroSection({
  title,
  subtitle,
  primaryCta = { text: 'Book a Strategy Call', href: '/book-call' },
  secondaryCta,
  showVisualization = false,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40 lg:px-8">
      {/* Animated background visualization */}
      {showVisualization ? (
        <AIProcessFlow />
      ) : (
        <AINetworkGrid />
      )}

      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10 gradient-mesh" />

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-muted-foreground">
              {title}
            </h1>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <motion.p
            className="mb-12 text-xl leading-relaxed text-muted-foreground text-balance max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {subtitle}
          </motion.p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {primaryCta && (
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden glow-border rounded-[var(--radius)] px-8 py-6 text-base font-semibold"
              >
                <Link href={primaryCta.href}>
                  <span className="relative z-10">{primaryCta.text}</span>
                  <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-[var(--radius)] border-white/10 hover:border-primary/30 hover:bg-white/5 px-8 py-6 text-base transition-all duration-300"
              >
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </motion.div>
        </AnimatedSection>

        {/* Trust indicator */}
        <AnimatedSection delay={0.3}>
          <motion.div
            className="mt-16 pt-8 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-sm text-muted-foreground">
              Trusted by businesses doing <span className="text-foreground font-semibold">R10m-R200m</span> in annual revenue
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
