import { HeroSection } from '@/components/marketing/hero-section'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'
import { Target } from 'lucide-react'

export const metadata = {
  title: 'AI Process Automation | Continu8',
  description:
    'Eliminate manual work and reduce errors with AI-powered automation designed for your business workflows.',
}

export default function AIAutomationPage() {
  const capabilities = [
    {
      title: 'Sales Process Automation',
      description:
        'Automate lead qualification, follow-ups, proposal generation, and pipeline management.',
      icon: "TrendingUp",
    },
    {
      title: 'Customer Support Triage',
      description:
        'Intelligent routing, automated responses, and escalation management for support tickets.',
      icon: "MessageSquare",
    },
    {
      title: 'Document Processing',
      description:
        'Extract, classify, and process documents automatically with AI-powered data extraction.',
      icon: "FileText",
    },
    {
      title: 'Finance & Admin Automation',
      description:
        'Automate invoicing, expense processing, reporting, and administrative workflows.',
      icon: "DollarSign",
    },
  ]

  const outcomes = [
    {
      title: 'Reduced Operational Cost',
      description:
        'Cut manual labor costs by 40-60% while maintaining or improving quality and accuracy.',
      icon: "DollarSign",
    },
    {
      title: 'Increased Staff Efficiency',
      description:
        'Free your team from repetitive tasks so they can focus on high-value strategic work.',
      icon: "Zap",
    },
    {
      title: 'Faster Decision-Making',
      description:
        'Real-time data processing and automated reporting give you instant insights.',
      icon: "Clock",
    },
    {
      title: 'Better Accuracy',
      description:
        'Eliminate human error in repetitive tasks with consistent, reliable automation.',
      icon: "CheckCircle",
    },
  ]

  const examples = [
    'Sales lead qualification and routing based on fit score',
    'Automated proposal generation from CRM data',
    'Customer support ticket triage and categorization',
    'Invoice processing and payment reconciliation',
    'Report generation and distribution',
    'Data entry and validation across systems',
    'Email campaign automation based on behavior',
    'Inventory monitoring and reorder triggers',
  ]

  return (
    <>
      <HeroSection
        title="AI Process Automation"
        subtitle="Eliminate manual work, reduce errors, and improve speed with intelligent automation designed specifically for your business workflows."
      />

      {/* What It Includes */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">What It Includes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive automation across all your core business processes
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={capabilities} columns={2} />
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Example Use Cases</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real automation we've implemented for businesses like yours
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassPanel>
              <div className="grid gap-4 md:grid-cols-2">
                {examples.map((example) => (
                  <div key={example} className="flex items-start">
                    <Target className="mr-3 h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{example}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Expected Outcomes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The measurable impact you can expect from AI automation
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={outcomes} columns={2} />
        </div>
      </section>

      <CtaSection
        title="Ready to automate your processes?"
        description="Let's discuss which of your workflows would benefit most from AI automation."
      />
    </>
  )
}
