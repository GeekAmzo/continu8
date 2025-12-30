import { HeroSection } from '@/components/marketing/hero-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'
import { BookingForm } from '@/components/marketing/booking-form'
import { Clock, Users, Target } from 'lucide-react'

export const metadata = {
  title: 'Book a Strategy Call | Continu8',
  description:
    'Schedule a free strategy call to discuss your operational challenges and explore how we can help.',
}

export default function BookCallPage() {
  const whatToExpect = [
    {
      icon: Clock,
      title: '60-Minute Deep Dive',
      description: 'We\'ll spend an hour understanding your business, challenges, and goals. No sales pitch.',
    },
    {
      icon: Target,
      title: 'Specific Recommendations',
      description: 'You\'ll leave with actionable insights on where automation and systems could help most.',
    },
    {
      icon: Users,
      title: 'Mutual Fit Evaluation',
      description: 'We\'ll be honest about whether we\'re the right partner for your specific needs.',
    },
  ]

  return (
    <>
      <HeroSection
        title="Book a Strategy Call"
        subtitle="Let's discuss your operational challenges and explore whether Continu8 is the right partner to help you scale."
      />

      {/* What to Expect */}
      <section className="px-6 py-16 lg:px-8 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">What to Expect</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This is a genuine conversation, not a sales call
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {whatToExpect.map((item, index) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <GlassPanel className="h-full text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </GlassPanel>
                </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection delay={0.3}>
            <GlassPanel className="border-primary/20">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="mb-3 text-xl font-semibold">Before You Book</h3>
                <p className="text-muted-foreground mb-4">
                  Our services are designed for established businesses (R10m+ revenue) ready to invest
                  R60k-R100k/month in systems and automation.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you're earlier stage or have a smaller budget, we might not be the right fit—but
                  we're happy to chat anyway and potentially point you in the right direction.
                </p>
              </div>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4">Tell Us About Your Business</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This helps us prepare for a productive conversation
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <BookingForm />
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                We respect your privacy. Your information will only be used to prepare for and follow up on
                your strategy call. We never sell or share contact information.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
