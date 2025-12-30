import { HeroSection } from '@/components/marketing/hero-section'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { ServiceCard } from '@/components/marketing/service-card'
import { QualificationBlock } from '@/components/marketing/qualification-block'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export default function HomePage() {
  const problemFeatures = [
    {
      title: 'Manual, Repetitive Work',
      description:
        'Your team spends hours on tasks that could be automated, costing you time and money while slowing growth.',
      icon: 'AlertTriangle',
    },
    {
      title: 'Poor System Integration',
      description:
        'Data silos and disconnected tools create inefficiencies, errors, and make it impossible to see the full picture.',
      icon: 'Link2',
    },
    {
      title: 'Scaling Limitations',
      description:
        'Legacy systems and processes that worked at 20 people break at 50, blocking your ability to scale reliably.',
      icon: 'TrendingDown',
    },
  ]

  const solutionFeatures = [
    {
      title: 'Systems Architecture',
      description:
        'Rock-solid infrastructure designed for reliability, security, and scale.',
      icon: 'Server',
    },
    {
      title: 'AI-Driven Automation',
      description:
        'Intelligent workflows that eliminate manual work and reduce errors.',
      icon: 'Bot',
    },
    {
      title: 'Continuous Optimization',
      description:
        'Ongoing improvements that keep your business running better, month after month.',
      icon: 'Zap',
    },
  ]

  const services = [
    {
      title: 'AI Process Automation',
      description:
        'Design and implementation of AI-powered workflows to eliminate manual work, reduce errors, and improve speed.',
      icon: 'Workflow',
      href: '/services/ai-automation',
      features: [
        'Sales process automation',
        'Customer support triage',
        'Finance & admin automation',
      ],
    },
    {
      title: 'Business Systems & Infrastructure',
      description:
        'Architecture, optimization, and oversight of business-critical systems for reliability and scale.',
      icon: 'Shield',
      href: '/services/systems-infrastructure',
      features: [
        'Cloud & server architecture',
        'Security & compliance',
        'Monitoring & reliability',
      ],
    },
    {
      title: 'Custom Software & Integrations',
      description:
        'Custom-built software and system integrations aligned to your exact business workflows.',
      icon: 'Code',
      href: '/services/custom-software',
      features: [
        'Internal tools & dashboards',
        'API integrations',
        'Data pipelines',
      ],
    },
  ]

  const goodFit = [
    'Your business turns over R10m+ annually',
    'You have 20-200 employees',
    "You're experiencing operational bottlenecks as you scale",
    'You want a long-term strategic partner, not just a vendor',
    "You're ready to invest R60k+/month in systems and automation",
  ]

  const notGoodFit = [
    'Your annual revenue is below R10m',
    "You're looking for a one-off project or quick fix",
    "You need someone to execute tasks, not build systems",
    'Your budget is below R60k/month',
    "You're not ready to commit to ongoing optimization",
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Build systems that keep your business running—continuously"
        subtitle="We help growing businesses eliminate operational friction, reduce costs, and scale reliably through secure systems architecture, AI-driven automation, and intelligent process design."
        showVisualization={true}
      />

      {/* Problem Statement */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">The Cost of Operational Inefficiency</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                As your business grows, manual processes and disconnected systems become expensive
                bottlenecks
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={problemFeatures} />
        </div>
      </section>

      {/* Solution Overview */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">The Continu8 Solution</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We build and maintain the systems that power your operations, so you can focus on
                growing your business
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={solutionFeatures} />

          <AnimatedSection delay={0.3}>
            <div className="mt-16 text-center">
              <GlassPanel className="inline-block">
                <p className="text-lg">
                  <span className="font-semibold text-foreground">Not project-based.</span>{' '}
                  <span className="text-muted-foreground">
                    We work on retainer as your ongoing systems partner.
                  </span>
                </p>
              </GlassPanel>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Qualification Block */}
      <QualificationBlock goodFit={goodFit} notGoodFit={notGoodFit} />

      {/* Services Preview */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Core Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three integrated service areas that work together to transform your operations
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel className="border-primary/20">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Retainer-Based Partnership</h3>
                  <p className="text-muted-foreground mb-4">
                    We don't do one-off projects. We become an extension of your team, continuously
                    improving your systems month after month.
                  </p>
                  <p className="text-muted-foreground">
                    This ensures we understand your business deeply and deliver compound value over
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Long-Term Value</h3>
                  <ul className="space-y-3">
                    {[
                      'Monthly retainers from R60,000 – R100,000+',
                      'Ongoing optimization and improvements',
                      'Regular strategy sessions',
                      'Priority support and maintenance',
                      'Predictable monthly investment',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
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

      {/* Final CTA */}
      <CtaSection
        title="Ready to transform your operations?"
        description="Book a strategy call to discuss your challenges and see if we're a good fit. No obligation, just a conversation."
        secondaryCta={{ text: 'View Pricing', href: '/pricing' }}
      />
    </>
  )
}
