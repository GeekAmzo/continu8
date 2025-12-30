import { HeroSection } from '@/components/marketing/hero-section'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Business Systems & Infrastructure | Continu8',
  description:
    'Rock-solid infrastructure architecture designed for reliability, security, and scale.',
}

export default function SystemsInfrastructurePage() {
  const capabilities = [
    {
      title: 'Cloud & Server Architecture',
      description:
        'Scalable, cost-effective cloud infrastructure designed for your specific workloads and growth trajectory.',
      icon: "Cloud",
    },
    {
      title: 'Security & Compliance',
      description:
        'Enterprise-grade security measures and compliance frameworks to protect your business and data.',
      icon: "Shield",
    },
    {
      title: 'Monitoring & Reliability',
      description:
        '24/7 monitoring, automated alerts, and proactive maintenance to ensure maximum uptime.',
      icon: "Activity",
    },
    {
      title: 'Scalability Planning',
      description:
        'Infrastructure that grows with you, from 20 to 200+ employees without performance degradation.',
      icon: "TrendingUp",
    },
  ]

  const includes = [
    {
      title: 'Network Design',
      description: 'Secure, high-performance network architecture',
      icon: "Wifi",
    },
    {
      title: 'Data Security',
      description: 'Encryption, access control, and compliance',
      icon: "Lock",
    },
    {
      title: 'Database Optimization',
      description: 'Performance tuning and query optimization',
      icon: "Database",
    },
    {
      title: 'Backup & Recovery',
      description: 'Automated backups and disaster recovery plans',
      icon: "HardDrive",
    },
  ]

  const whyItMatters = [
    {
      point: 'Downtime Prevention',
      impact: 'Every hour of downtime costs businesses R10,000 - R100,000+ in lost revenue',
    },
    {
      point: 'Security Breaches',
      impact: 'Data breaches can cost millions in damages, fines, and reputational harm',
    },
    {
      point: 'Scaling Failures',
      impact: 'Poor infrastructure prevents growth and causes customer experience issues',
    },
    {
      point: 'Technical Debt',
      impact: 'Legacy systems become exponentially more expensive to maintain over time',
    },
  ]

  return (
    <>
      <HeroSection
        title="Business Systems & Infrastructure"
        subtitle="Rock-solid infrastructure architecture, optimization, and oversight of business-critical systems to ensure reliability, security, and scalability."
      />

      {/* What It Includes */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4">Comprehensive Infrastructure Management</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to run a secure, reliable, scalable operation
              </p>
            </div>
          </AnimatedSection>

          <FeatureGrid features={capabilities} columns={2} />

          <div className="mt-16">
            <FeatureGrid features={includes} columns={4} />
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Why Infrastructure Matters</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The hidden costs of poor infrastructure add up fast
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {whyItMatters.map((item, index) => (
              <AnimatedSection key={item.point} delay={index * 0.1}>
                <GlassPanel className="h-full border-destructive/20">
                  <h3 className="mb-3 text-lg font-semibold">{item.point}</h3>
                  <p className="text-sm text-muted-foreground">{item.impact}</p>
                </GlassPanel>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 py-16 sm:py-24 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">What You Get</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassPanel>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  '99.9%+ uptime guarantee',
                  'Enterprise-grade security',
                  'Scalable infrastructure',
                  'Proactive monitoring',
                  'Regular optimization',
                  'Disaster recovery',
                  'Performance tuning',
                  'Cost optimization',
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <Shield className="mr-3 h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection
        title="Protect your business with reliable infrastructure"
        description="Let's audit your current setup and identify vulnerabilities before they become problems."
      />
    </>
  )
}
