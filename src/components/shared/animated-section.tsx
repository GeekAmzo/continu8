'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerChildren?: boolean
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  staggerChildren = false,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? 0.1 : 0,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerChildren ? containerVariants : itemVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
