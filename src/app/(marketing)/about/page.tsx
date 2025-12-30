import { HeroSection } from '@/components/marketing/hero-section'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'
import * as Icons from 'lucide-react'

export const metadata = {
  title: 'About | Continu8',
  description:
    'Learn about Continu8\'s mission to help growing businesses build systems that scale through automation and intelligent infrastructure.',
}

export default function AboutPage() {
  const values = [
    {
      icon: 'Target',
      title: 'Precision',
      description:
        'We build exactly what you need, nothing more, nothing less. Every system, every automation, every line of code serves a clear business purpose.',
    },
    {
      icon: 'Zap',
      title: 'Speed',
      description:
        'We move fast without breaking things. Rapid iteration, continuous delivery, and quick wins that build momentum toward bigger goals.',
    },
    {
      icon: 'Shield',
      title: 'Reliability',
      description:
        'Your business depends on these systems. We build for uptime, security, and stability—because downtime costs money and trust.',
    },
  ]

  const expertise = [
    {
      area: 'AI & Automation',
      description:
        'We\'ve built automation workflows that save businesses hundreds of hours per month, from lead qualification to support triage to invoice processing.',
    },
    {
      area: 'Systems Architecture',
      description:
        'Cloud infrastructure, database design, API integrations, and scalable backend systems that handle growth without breaking.',
    },
    {
      area: 'Business Process',
      description:
        'We understand how businesses actually work. CRM, sales pipelines, support workflows, finance operations—we\'ve optimized them all.',
    },
    {
      area: 'Security & Compliance',
      description:
        'Enterprise-grade security practices, data protection, and compliance frameworks to keep your business and customers safe.',
    },
  ]

  return (
    <>
      <HeroSection
        title="Built Different"
        subtitle="We're not a typical development agency. We're systems thinkers who build automation and infrastructure for businesses that want to scale without chaos."
      />

      {/* Mission */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel className="border-primary/20">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="mb-6">Our Mission</h2>
                <p className="text-xl text-muted-foreground mb-4">
                  Most businesses grow to a point where manual processes and disconnected systems
                  become expensive bottlenecks.
                </p>
                <p className="text-xl text-muted-foreground mb-4">
                  We exist to solve that problem—not with one-off projects, but with ongoing
                  systems partnership that compounds value over time.
                </p>
                <p className="text-xl text-foreground font-semibold">
                  We build the infrastructure that lets you focus on growing your business instead
                  of fighting operational fires.
                </p>
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = (Icons as any)[value.icon] as Icons.LucideIcon
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <GlassPanel className="h-full text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </GlassPanel>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">What We're Good At</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep expertise across the full stack of business systems
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {expertise.map((item, index) => (
              <AnimatedSection key={item.area} delay={index * 0.1}>
                <GlassPanel className="h-full">
                  <h3 className="mb-3 text-xl font-semibold">{item.area}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </GlassPanel>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Retainer Model */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Why We Work on Retainer</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Project-based work doesn't work for systems that need to evolve
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <GlassPanel className="h-full border-destructive/20">
                <h3 className="mb-4 text-xl font-semibold">The Problem with Projects</h3>
                <ul className="space-y-3">
                  {[
                    'Scope creep and change orders create friction',
                    'Incentive to finish quickly, not perfectly',
                    'No accountability after delivery',
                    'Your business changes but the system doesn\'t',
                    'Every new need requires a new contract',
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassPanel className="h-full border-primary/20">
                <h3 className="mb-4 text-xl font-semibold">The Retainer Advantage</h3>
                <ul className="space-y-3">
                  {[
                    'Continuous optimization and improvements',
                    'Aligned incentives (we win when you win)',
                    'Deep understanding of your business',
                    'Flexibility to pivot as priorities change',
                    'Compound value that accelerates over time',
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <GlassPanel className="text-center">
                <p className="text-lg text-muted-foreground">
                  <span className="font-semibold text-foreground">Think of us as your CTO,</span>{' '}
                  but without the full-time salary. We're an extension of your team, continuously
                  working to make your operations better, month after month.
                </p>
              </GlassPanel>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Who We Work With</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're selective about partnerships because deep work requires deep fit
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassPanel>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Our Best Clients</h3>
                  <ul className="space-y-3">
                    {[
                      'R10m-R200m annual revenue',
                      '20-200 employees',
                      'Experiencing growing pains from scaling',
                      'Value strategic partnership over cheapest price',
                      'Ready to invest R60k-R100k/month in systems',
                      'Want ongoing optimization, not one-off projects',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Probably Not a Fit</h3>
                  <ul className="space-y-3">
                    {[
                      'Early-stage startups (sub-R10m revenue)',
                      'Looking for one-off project or quick fix',
                      'Need execution only, no strategic input',
                      'Budget below R60k/month',
                      'Want to own all technology decisions',
                      'Not ready for operational change',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection
        title="Sound like a fit?"
        description="Book a strategy call and let's discuss whether we're the right partner for your business."
      />
    </>
  )
}
