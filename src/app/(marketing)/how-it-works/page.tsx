import { HeroSection } from '@/components/marketing/hero-section'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export const metadata = {
  title: 'How It Works | Continu8',
  description:
    'Our 5-step process for building systems that transform your operations and drive continuous improvement.',
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Strategy Call',
      duration: 'Week 1',
      description:
        'We start with a deep-dive strategy call to understand your business, pain points, and goals. No sales pitch—just a genuine conversation about where you are and where you want to be.',
      deliverables: [
        'Complete operational assessment',
        'Identified bottlenecks and opportunities',
        'Clear understanding of priorities',
        'Mutual fit evaluation',
      ],
    },
    {
      number: '02',
      title: 'Systems Audit & Roadmap',
      duration: 'Week 2-3',
      description:
        'We analyze your current systems, workflows, and tech stack. Then we create a detailed roadmap showing exactly what we\'ll build, in what order, and why.',
      deliverables: [
        'Complete systems audit report',
        'Prioritized implementation roadmap',
        'Cost-benefit analysis for each initiative',
        'Timeline with clear milestones',
      ],
    },
    {
      number: '03',
      title: 'Foundation Build',
      duration: 'Month 1-2',
      description:
        'We build the core infrastructure and critical automations first. This phase focuses on quick wins that deliver immediate value while laying the groundwork for long-term improvements.',
      deliverables: [
        'Core systems architecture in place',
        'First wave of automation live',
        'Initial integrations connected',
        'Team training on new systems',
      ],
    },
    {
      number: '04',
      title: 'Expansion & Optimization',
      duration: 'Month 3-6',
      description:
        'With the foundation solid, we expand automation coverage, build custom tools, and optimize everything based on real usage data. This is where compound value starts to accelerate.',
      deliverables: [
        'Advanced automation workflows',
        'Custom dashboards and tools',
        'Integration of all key systems',
        'Documented processes and playbooks',
      ],
    },
    {
      number: '05',
      title: 'Continuous Improvement',
      duration: 'Ongoing',
      description:
        'We don\'t stop at "done." We continuously monitor, optimize, and improve your systems month after month. As your business evolves, your systems evolve with it.',
      deliverables: [
        'Monthly optimization sprints',
        'Proactive monitoring and maintenance',
        'Regular strategy sessions',
        'Ongoing feature additions',
      ],
    },
  ]

  const principles = [
    {
      title: 'No Surprises',
      description:
        'Clear communication, transparent pricing, and realistic timelines. You always know what we\'re working on and why.',
    },
    {
      title: 'Results First',
      description:
        'We prioritize work that delivers measurable value quickly. Big picture strategy, but practical execution.',
    },
    {
      title: 'Long-Term Partnership',
      description:
        'We\'re not here for a quick project. We build relationships that compound value over years, not months.',
    },
    {
      title: 'Your Success = Our Success',
      description:
        'We only win when you win. Our retainer model aligns our incentives with your long-term growth.',
    },
  ]

  return (
    <>
      <HeroSection
        title="How We Work"
        subtitle="A proven 5-step process for transforming your operations from manual and chaotic to automated and scalable."
      />

      {/* Process Steps */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">The Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From initial conversation to continuous improvement, here's exactly how we work
                together
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <AnimatedSection key={step.number} delay={index * 0.1}>
                  <div className="relative">
                    {/* Step number indicator */}
                    <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </div>

                    {/* Step content */}
                    <div className="md:ml-24">
                      <GlassPanel className="border-primary/20">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="md:hidden text-3xl font-bold text-primary">
                                {step.number}
                              </span>
                              <h3 className="text-2xl font-semibold">{step.title}</h3>
                            </div>
                            <p className="text-sm text-primary">{step.duration}</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6">{step.description}</p>

                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                            Deliverables
                          </h4>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {step.deliverables.map((deliverable) => (
                              <li key={deliverable} className="flex items-start">
                                <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                <span className="text-sm text-muted-foreground">
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Our Guiding Principles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The values that shape how we work with every client
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {principles.map((principle, index) => (
              <AnimatedSection key={principle.title} delay={index * 0.1}>
                <GlassPanel className="h-full">
                  <h3 className="mb-3 text-xl font-semibold">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </GlassPanel>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel className="border-primary/20">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">What to Expect</h3>
                  <ul className="space-y-3">
                    {[
                      'Weekly sync calls to review progress',
                      'Shared project board with full transparency',
                      'Direct access to our team via Slack',
                      'Monthly strategy sessions',
                      'Detailed monthly reports',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">What We Need From You</h3>
                  <ul className="space-y-3">
                    {[
                      'Access to relevant systems and data',
                      'Input from key stakeholders',
                      'Feedback on what we build',
                      'Commitment to the process',
                      'Willingness to change workflows when needed',
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

      <CtaSection
        title="Ready to get started?"
        description="Book a strategy call to discuss your specific challenges and see how our process applies to your business."
      />
    </>
  )
}
