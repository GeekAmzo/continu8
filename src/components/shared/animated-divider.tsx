'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedDividerProps {
  className?: string
}

export function AnimatedDivider({ className }: AnimatedDividerProps) {
  return (
    <div className={cn('relative h-px w-full overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <div className="absolute inset-0 bg-border" />
    </div>
  )
}
