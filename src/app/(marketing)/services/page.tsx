import { HeroSection } from '@/components/marketing/hero-section'
import { ServiceCard } from '@/components/marketing/service-card'
import { CtaSection } from '@/components/marketing/cta-section'
import { AnimatedSection } from '@/components/shared/animated-section'

export const metadata = {
  title: 'Services | Continu8',
  description:
    'Comprehensive business systems, AI automation, and custom software services for growing businesses.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'AI Process Automation',
      description:
        'Design and implementation of AI-powered workflows to eliminate manual work, reduce errors, and improve speed across your entire operation.',
      icon: 'Workflow',
      href: '/services/ai-automation',
      features: [
        'Sales process automation',
        'Customer support triage & routing',
        'Internal reporting & analytics',
        'Finance & administrative automation',
        'Document processing & data entry',
      ],
    },
    {
      title: 'Business Systems & Infrastructure',
      description:
        'Architecture, optimization, and oversight of business-critical systems to ensure reliability, security, and scalability as you grow.',
      icon: 'Shield',
      href: '/services/systems-infrastructure',
      features: [
        'Cloud & server architecture',
        'Network design & security',
        'System monitoring & reliability',
        'Scalability planning & optimization',
        'Disaster recovery & backup',
      ],
    },
    {
      title: 'Custom Software & Integrations',
      description:
        'Custom-built software and system integrations perfectly aligned to your unique business workflows and requirements.',
      icon: 'Code',
      href: '/services/custom-software',
      features: [
        'Internal tools & dashboards',
        'API integrations & connectors',
        'Data pipelines & ETL',
        'Automation backends',
        'Custom business applications',
      ],
    },
  ]

  return (
    <>
      <HeroSection
        title="Services Built for Scale"
        subtitle="Three integrated service areas that work together to transform your operations, eliminate waste, and drive continuous improvement."
        primaryCta={{ text: 'Get in Touch', href: 'mailto:amrish@geek247.co.za' }}
        secondaryCta={{ text: 'View Pricing', href: '/pricing' }}
      />

      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:gap-16">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.15}>
                <ServiceCard {...service} className="max-w-none" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Not sure which service you need?"
        description="Book a strategy call and we'll help you identify the right approach for your specific challenges."
      />
    </>
  )
}
