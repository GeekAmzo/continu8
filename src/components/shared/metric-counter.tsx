'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface MetricCounterProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  duration?: number
}

export function MetricCounter({
  value,
  className,
  prefix = '',
  suffix = '',
  duration = 2,
}: MetricCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const spring = useSpring(0, { duration: duration * 1000 })
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, isInView, value])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
