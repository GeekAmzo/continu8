'use client'

import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PricingCardProps {
  name: string
  description: string
  price: string
  period?: string
  features: string[]
  recommended?: boolean
  cta?: {
    text: string
    href: string
  }
  badge?: string
}

export function PricingCard({
  name,
  description,
  price,
  period = '/month',
  features,
  recommended = false,
  cta = { text: 'Contact Us', href: 'mailto:amrish@geek247.co.za' },
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          'relative h-full bg-black border-2 transition-all duration-300',
          recommended
            ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]'
            : 'border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]'
        )}
      >
        {/* Content */}
        <div className="relative p-8">
          {/* Badge */}
          {badge && (
            <div className="mb-6">
              <span
                className={cn(
                  'inline-block px-3 py-1 text-xs font-orbitron uppercase tracking-wider border',
                  recommended
                    ? 'bg-white/10 text-white border-white'
                    : 'bg-white/5 text-white/70 border-white/30'
                )}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 pb-6 border-b border-white/20">
            <h3 className="mb-2 text-xl font-orbitron font-bold uppercase tracking-wider text-white">
              {name}
            </h3>
            <p className="text-sm text-white/60 font-sans">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-orbitron font-bold text-white">
                {price}
              </span>
              {period && (
                <span className="text-sm text-white/50 font-sans">
                  {period}
                </span>
              )}
            </div>
          </div>

          {/* Features */}
          <ul className="mb-8 space-y-3">
            {features.map((feature, index) => (
              <li
                key={feature}
                className="flex items-start gap-3"
              >
                <Check className={cn(
                  "h-4 w-4 flex-shrink-0 mt-0.5",
                  recommended ? "text-white" : "text-white/70"
                )} />
                <span className="text-sm text-white/80 font-sans leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-4 border-t border-white/20">
            <Link
              href={cta.href}
              className={cn(
                'flex items-center justify-center w-full px-6 py-3 border-2 font-orbitron uppercase tracking-wider text-sm font-semibold transition-all duration-300 group/btn',
                recommended
                  ? 'border-white bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'border-white/50 bg-transparent text-white hover:border-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
              )}
            >
              <span>{cta.text}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
