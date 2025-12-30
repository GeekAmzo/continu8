'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-semibold">Continu8</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/book-call">Book a Call</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden transition-all duration-300 ease-in-out overflow-hidden',
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="space-y-2 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.02] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/book-call" onClick={() => setMobileMenuOpen(false)}>
                  Book a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
