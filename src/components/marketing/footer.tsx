import Link from 'next/link'

export function Footer() {
  const navigation = {
    services: [
      { name: 'AI Process Automation', href: '/services/ai-automation' },
      { name: 'Business Systems', href: '/services/systems-infrastructure' },
      { name: 'Custom Software', href: '/services/custom-software' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-semibold">
              Continu8
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Building systems that keep your business running, scaling, and improving — continuously.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Continu8. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
