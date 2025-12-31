import { HeroSection } from '@/components/marketing/hero-section'
import { AnimatedSection } from '@/components/shared/animated-section'
import { GlassPanel } from '@/components/shared/glass-panel'

export const metadata = {
  title: 'Privacy Policy | Continu8',
  description: 'Privacy Policy for Continu8 - How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <HeroSection
        title="Privacy Policy"
        subtitle="Last updated: December 31, 2024"
      />

      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <GlassPanel className="prose prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                Continu8 ("we", "our", or "us") respects your privacy and is committed to protecting your
                personal data. This privacy policy explains how we collect, use, and safeguard your information
                when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>
              <h3>Information You Provide</h3>
              <ul>
                <li>Contact information (name, email, phone number)</li>
                <li>Company information (company name, website, industry)</li>
                <li>Business details (revenue range, employee count, challenges)</li>
                <li>Booking preferences (date, time, timezone)</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Usage data and analytics</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Schedule and manage strategy calls</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Send relevant business updates (only if you opt-in)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data
                against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in
                transit and at rest.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in
                this privacy policy, unless a longer retention period is required by law.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2>Third-Party Services</h2>
              <p>
                We use trusted third-party services for hosting, analytics, and communication. These services
                have their own privacy policies and data protection measures.
              </p>

              <h2>Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control
                cookie preferences through your browser settings.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or how we handle your data, please contact
                us at privacy@continu8.co.za
              </p>
            </GlassPanel>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
