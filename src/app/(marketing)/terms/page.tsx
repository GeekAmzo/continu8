import { HeroSection } from '@/components/marketing/hero-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export const metadata = {
  title: 'Terms of Service | Continu8',
  description: 'Terms of Service for Continu8 - Legal agreement between you and Continu8.',
}

export default function TermsPage() {
  return (
    <>
      <HeroSection
        title="Terms of Service"
        subtitle="Last updated: December 31, 2024"
      />

      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <GlassPanel className="prose prose-invert max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using Continu8's services, you agree to be bound by these Terms of Service. If
                you disagree with any part of these terms, you may not access our services.
              </p>

              <h2>Services</h2>
              <p>
                Continu8 provides business automation, systems infrastructure, and custom software development
                services to qualified businesses. Our services are delivered on a retainer or project basis as
                outlined in individual service agreements.
              </p>

              <h2>Eligibility</h2>
              <p>
                Our services are designed for established businesses with annual revenue of R10m+ and monthly
                budgets of R60k-R100k+. By booking a strategy call, you represent that you have the authority to
                make business decisions on behalf of your organization.
              </p>

              <h2>Booking and Cancellation</h2>
              <ul>
                <li>Strategy calls are free, no-obligation consultations</li>
                <li>You may cancel or reschedule with 24 hours notice</li>
                <li>No-shows may result in limited availability for future bookings</li>
              </ul>

              <h2>Service Agreements</h2>
              <p>
                If you choose to engage Continu8 for services, a separate Master Services Agreement (MSA) will
                be executed. The MSA will outline:
              </p>
              <ul>
                <li>Scope of work and deliverables</li>
                <li>Pricing and payment terms</li>
                <li>Intellectual property rights</li>
                <li>Confidentiality obligations</li>
                <li>Service level agreements (SLAs)</li>
                <li>Termination clauses</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                Unless otherwise specified in a service agreement, you retain ownership of your business data
                and IP. Continu8 retains ownership of our proprietary tools, methodologies, and frameworks.
                Custom-built solutions may have shared or exclusive IP rights as specified in the MSA.
              </p>

              <h2>Confidentiality</h2>
              <p>
                Both parties agree to keep confidential information private. This includes business strategies,
                financial data, technical implementations, and any information marked as confidential.
              </p>

              <h2>Warranties and Disclaimers</h2>
              <p>
                We provide our services "as is" and make no warranties regarding specific business outcomes. We
                warrant that services will be performed with professional care and industry best practices.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                Continu8's liability for any claim arising from our services is limited to the fees paid for
                those specific services. We are not liable for indirect, consequential, or special damages.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify Continu8 against claims arising from your use of our services, violation
                of these terms, or infringement of third-party rights.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms are governed by the laws of South Africa. Any disputes will be resolved in South
                African courts.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Material changes will be communicated
                via email to active clients.
              </p>

              <h2>Contact</h2>
              <p>
                For questions about these terms, contact us at legal@continu8.co.za
              </p>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
