'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  cta = { text: 'Book a Call', href: '/book-call' },
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-[var(--radius-lg)] border backdrop-blur-xl',
          'transition-all duration-400',
          recommended
            ? 'border-primary/30 bg-gradient-to-b from-white/[0.04] to-white/[0.02] glow-border'
            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12]'
        )}
        style={{
          boxShadow: recommended
            ? '0 0 0 1px rgba(99, 102, 241, 0.1), 0 20px 60px -12px rgba(99, 102, 241, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 0 0 1px rgba(99, 102, 241, 0.05), 0 8px 32px -8px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Animated top border for recommended */}
        {recommended && (
          <div className="absolute inset-x-0 top-0 h-px">
            <div className="h-full w-full animated-gradient-border" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-8 lg:p-10">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Badge
                className={cn(
                  'mb-6 px-3 py-1',
                  recommended
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-white/5 text-muted-foreground border-white/10'
                )}
                variant="outline"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h3 className="mb-3 text-2xl lg:text-3xl font-bold tracking-tight">
              {name}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-10">
            <div className="flex items-baseline">
              <span
                className={cn(
                  'text-5xl lg:text-6xl font-bold tracking-tight',
                  recommended && 'text-gradient-primary'
                )}
              >
                {price}
              </span>
              {period && (
                <span className="ml-3 text-lg text-muted-foreground">
                  {period}
                </span>
              )}
            </div>
          </div>

          {/* Features */}
          <ul className="mb-10 space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                <div
                  className={cn(
                    'mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                    recommended
                      ? 'bg-primary/10 text-primary'
                      : 'bg-white/5 text-muted-foreground'
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm leading-relaxed text-foreground/90">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            asChild
            className={cn(
              'w-full group/btn rounded-[var(--radius)] px-6 py-6 text-base font-semibold',
              recommended && 'glow-border'
            )}
            variant={recommended ? 'default' : 'outline'}
            size="lg"
          >
            <Link href={cta.href} className="flex items-center justify-center">
              <span>{cta.text}</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 -z-10 opacity-0 transition-opacity duration-400 pointer-events-none',
            recommended
              ? 'bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 group-hover:opacity-100'
              : 'bg-gradient-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100'
          )}
        />
      </div>
    </motion.div>
  )
}
