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
    <footer className="border-t-2 border-white/30 bg-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-orbitron font-bold uppercase tracking-wider text-white neon-text hover:text-white/80 transition-colors duration-300">
              Continu8
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs font-sans">
              Building systems that keep your business running, scaling, and improving — continuously.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-orbitron uppercase tracking-wider text-white font-bold">Services</h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-sans text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-orbitron uppercase tracking-wider text-white font-bold">Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-sans text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-orbitron uppercase tracking-wider text-white font-bold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-sans text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-white/20 pt-8">
          <p className="text-xs text-white/50 text-center font-orbitron tracking-wider">
            &copy; {new Date().getFullYear()} CONTINU8. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
