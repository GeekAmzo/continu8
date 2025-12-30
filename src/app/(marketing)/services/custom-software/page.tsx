import { HeroSection } from '@/components/marketing/hero-section'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export const metadata = {
  title: 'Custom Software & Integrations | Continu8',
  description:
    'Custom-built software and system integrations perfectly aligned to your business workflows.',
}

export default function CustomSoftwarePage() {
  const capabilities = [
    {
      title: 'Internal Tools & Dashboards',
      description:
        'Custom applications and dashboards tailored to your exact workflows and data needs.',
      icon: "Layout",
    },
    {
      title: 'API Integrations',
      description:
        'Connect your tools and systems with custom integrations that actually work together.',
      icon: "Link2",
    },
    {
      title: 'Data Pipelines',
      description:
        'Automated data flows between systems, ensuring consistency and real-time insights.',
      icon: "Database",
    },
    {
      title: 'Automation Backends',
      description:
        'The infrastructure that powers your automation workflows behind the scenes.',
      icon: "Cog",
    },
  ]

  const examples = [
    {
      title: 'Custom CRM Extensions',
      description:
        'Build exactly the features your CRM is missing, without switching platforms.',
      icon: "Puzzle",
    },
    {
      title: 'Analytics Dashboards',
      description:
        'Real-time visibility into the metrics that matter for your specific business.',
      icon: "BarChart",
    },
    {
      title: 'Workflow Automation',
      description:
        'Custom workflows that connect all your tools exactly how you need them to work.',
      icon: "Workflow",
    },
    {
      title: 'Business Applications',
      description:
        'Full applications built specifically for your unique processes and requirements.',
      icon: "Code",
    },
  ]

  const useCases = [
    'Sales pipeline dashboard pulling data from multiple sources',
    'Custom order processing system integrated with inventory',
    'Client portal with project tracking and billing',
    'Automated reporting tool that combines financial and operational data',
    'Integration between legacy systems and modern cloud tools',
    'Internal admin panel for managing complex business rules',
    'Custom API middleware for connecting incompatible systems',
    'Data warehouse consolidating information from all platforms',
  ]

  return (
    <>
      <HeroSection
        title="Custom Software & Integrations"
        subtitle="Custom-built software and system integrations perfectly aligned to your unique business workflows and requirements."
      />

      {/* What We Build */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">What We Build</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Software that fits your business, not the other way around
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={capabilities} columns={2} />
        </div>
      </section>

      {/* Common Solutions */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Common Solutions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Types of custom software we frequently build for clients
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={examples} columns={2} />
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Example Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real custom software we've built for businesses
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassPanel>
              <div className="grid gap-4 md:grid-cols-2">
                {useCases.map((useCase) => (
                  <div key={useCase} className="flex items-start">
                    <Code className="mr-3 h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{useCase}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Custom */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <GlassPanel className="border-primary/20">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Why Go Custom?</h3>
                  <p className="text-muted-foreground mb-4">
                    Off-the-shelf software forces you to change your processes to fit the tool.
                    Custom software does the opposite.
                  </p>
                  <p className="text-muted-foreground">
                    When your workflows are unique (and competitive advantages), generic tools hold
                    you back.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">When It Makes Sense</h3>
                  <ul className="space-y-3">
                    {[
                      'Your process is a competitive advantage',
                      "Existing tools don't fit your workflow",
                      "You need systems to talk to each other",
                      "You're outgrowing spreadsheets",
                      'Your team spends hours on manual workarounds',
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
        title="Have a custom software challenge?"
        description="Let's discuss your unique requirements and design the perfect solution."
      />
    </>
  )
}
