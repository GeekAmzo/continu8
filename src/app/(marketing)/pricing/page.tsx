import { HeroSection } from '@/components/marketing/hero-section'
import { PricingCard } from '@/components/marketing/pricing-card'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export const metadata = {
  title: 'Pricing | Continu8',
  description:
    'Transparent, outcome-based pricing for business systems and AI automation. Monthly retainers from R60,000.',
}

export default function PricingPage() {
  const pricingTiers = [
    {
      name: 'AI & Systems Automation Retainer',
      description: 'Continuous optimization and improvement',
      price: 'R60,000 – R100,000',
      period: '/month',
      badge: 'Most Popular',
      recommended: true,
      features: [
        'Ongoing AI automation implementation',
        'Process optimization and improvement',
        'Systems oversight and maintenance',
        'Monthly strategy sessions',
        'Priority support',
        'Continuous monitoring and improvements',
        'Quarterly business review',
      ],
      cta: {
        text: 'Book a Strategy Call',
        href: '/book-call',
      },
    },
    {
      name: 'Build + Retain Engagement',
      description: 'Major build followed by ongoing optimization',
      price: 'R150,000 – R300,000',
      period: ' once-off, then R50k – R80k/month',
      features: [
        'Comprehensive process audit and mapping',
        'Initial system build and deployment',
        'Team training and handover',
        'Transition to ongoing retainer',
        'Continuous improvement and support',
        'Monthly optimization sessions',
      ],
      cta: {
        text: 'Book a Strategy Call',
        href: '/book-call',
      },
    },
    {
      name: 'Paid Process Audit',
      description: 'Deep dive into your operations',
      price: 'R25,000 – R50,000',
      period: ' once-off',
      features: [
        'Comprehensive operational review',
        'Automation opportunity identification',
        'ROI projections and roadmap',
        'Prioritized implementation plan',
        'Technology stack recommendations',
        'Detailed written report',
      ],
      cta: {
        text: 'Request an Audit',
        href: '/book-call',
      },
    },
  ]

  return (
    <>
      <HeroSection
        title="Clear, Outcome-Based Pricing"
        subtitle="No hourly billing. No project-based pricing. Just predictable monthly investments that deliver compound value over time."
        primaryCta={{ text: 'Book a Strategy Call', href: '/book-call' }}
        secondaryCta={undefined}
      />

      {/* Pricing Philosophy */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel className="border-primary/20">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Outcome-Based</h3>
                  <p className="text-sm text-muted-foreground">
                    We charge for results and value delivered, not hours worked.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Retainer-Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly retainers ensure continuous improvement, not one-off projects.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">No Hourly Billing</h3>
                  <p className="text-sm text-muted-foreground">
                    Predictable monthly investment with unlimited strategic value.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <AnimatedSection key={tier.name} delay={index * 0.15}>
                <PricingCard {...tier} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">What's Always Included</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every engagement includes these core elements
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Strategic Partnership',
                description:
                  'We become an extension of your team, deeply understanding your business',
              },
              {
                title: 'Proactive Optimization',
                description: 'Continuous improvements without needing to ask',
              },
              {
                title: 'Transparent Communication',
                description: 'Regular updates, clear roadmaps, and honest feedback',
              },
              {
                title: 'Quality Guarantee',
                description: 'Enterprise-grade work, tested and documented',
              },
              {
                title: 'Knowledge Transfer',
                description: 'Your team learns and grows, not just dependent on us',
              },
              {
                title: 'Flexible Scaling',
                description: 'Adjust scope and investment as your needs evolve',
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <GlassPanel className="h-full">
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </GlassPanel>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Note */}
      <section className="px-6 py-16 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel>
              <h3 className="mb-4 text-xl font-semibold">Pricing Notes</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Why ranges?</strong> Every business is
                  different. Pricing depends on complexity, scale, and current state of your
                  systems. We'll give you exact pricing after our initial strategy call.
                </p>
                <p>
                  <strong className="text-foreground">What if I'm not sure which tier?</strong> Book
                  a strategy call. We'll assess your needs and recommend the right approach. No
                  obligation.
                </p>
                <p>
                  <strong className="text-foreground">Can I start with an audit?</strong> Yes. Many
                  clients start with a paid audit to understand the opportunity, then move to a
                  retainer.
                </p>
                <p>
                  <strong className="text-foreground">Minimum commitment?</strong> Typically 6
                  months for retainers. This ensures we can deliver real, compounding value rather
                  than quick fixes.
                </p>
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="mb-4">Ready to get started?</h2>
            <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Book a strategy call to discuss your challenges, explore fit, and get exact pricing
              for your situation.
            </p>
            <a
              href="/book-call"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a Strategy Call
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
