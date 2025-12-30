'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
  features?: string[]
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  features,
  className,
}: ServiceCardProps) {
  const Icon = (Icons as any)[icon] as Icons.LucideIcon
  const ArrowRight = Icons.ArrowRight

  return (
    <Link href={href} className="group block">
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-[var(--radius-md)] border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl',
          'transition-all duration-400 ease-out',
          'hover:border-white/[0.15]',
          'glow-border',
          className
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.05), 0 8px 32px -8px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Icon container with gradient background */}
        <motion.div
          className="mb-6 inline-flex rounded-[var(--radius)] p-4 gradient-primary border border-white/[0.08]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon className="h-7 w-7 text-primary" />
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-semibold tracking-tight group-hover:text-gradient-primary transition-all">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Features list */}
        {features && features.length > 0 && (
          <ul className="mb-8 space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                className="flex items-start text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* CTA button */}
        <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors duration-300">
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
