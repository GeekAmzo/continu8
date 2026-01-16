import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassPanel } from '@/components/shared/glass-panel'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CheckCircle2, Calendar, Mail, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Thank You | Continu8',
  description: 'Your strategy call has been submitted. We\'ll be in touch shortly.',
}

export default function ThankYouPage() {
  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'You\'ll receive a confirmation email with all the details within the next few minutes.',
    },
    {
      icon: Calendar,
      title: 'We\'ll Confirm Your Time',
      description: 'Our team will review your preferred time and send a calendar invite, or suggest alternatives if needed.',
    },
    {
      icon: CheckCircle2,
      title: 'Prepare for the Call',
      description: 'Think about specific challenges you want to discuss. The more context we have, the more valuable the conversation.',
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your strategy call booking has been submitted successfully. We're excited to learn more about
              your business and explore how we can help.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GlassPanel className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-semibold">What Happens Next?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {nextSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </GlassPanel>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <GlassPanel className="border-primary/20 mb-12">
            <div className="text-center">
              <h3 className="mb-3 text-xl font-semibold">Questions Before the Call?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions or need to make changes to your booking, feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="mailto:amrish@geek247.co.za">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+27XXXXXXXXX">
                    <Calendar className="mr-2 h-4 w-4" />
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
          </GlassPanel>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">While you wait, feel free to explore more about what we do</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/services">
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/how-it-works">
                  How We Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">
                  About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
