'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Node {
  id: number
  x: number
  y: number
  size: number
  connections: number[]
}

export function AIProcessFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Define nodes (system architecture points)
    const nodes: Node[] = [
      { id: 1, x: 15, y: 30, size: 8, connections: [2, 3] },
      { id: 2, x: 35, y: 20, size: 12, connections: [4] },
      { id: 3, x: 35, y: 40, size: 10, connections: [4, 5] },
      { id: 4, x: 55, y: 25, size: 14, connections: [6] },
      { id: 5, x: 55, y: 45, size: 10, connections: [6] },
      { id: 6, x: 75, y: 35, size: 12, connections: [7] },
      { id: 7, x: 90, y: 35, size: 10, connections: [] },
    ]

    let flowProgress = 0

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      // Draw connections with flow effect
      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodes.find((n) => n.id === targetId)
          if (!target) return

          const x1 = (node.x / 100) * width
          const y1 = (node.y / 100) * height
          const x2 = (target.x / 100) * width
          const y2 = (target.y / 100) * height

          // Base connection line
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          // Animated flow line
          const progress = (flowProgress % 100) / 100
          const flowX = x1 + (x2 - x1) * progress
          const flowY = y1 + (y2 - y1) * progress

          const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0)')
          gradient.addColorStop(progress - 0.1 > 0 ? progress - 0.1 : 0, 'rgba(99, 102, 241, 0)')
          gradient.addColorStop(progress, 'rgba(99, 102, 241, 0.6)')
          gradient.addColorStop(progress + 0.05 < 1 ? progress + 0.05 : 1, 'rgba(34, 211, 238, 0.4)')
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0)')

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          // Flow particle
          ctx.fillStyle = 'rgba(99, 102, 241, 0.8)'
          ctx.beginPath()
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2)
          ctx.fill()

          // Particle glow
          const glowGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8)
          glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)')
          glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(flowX, flowY, 8, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        const x = (node.x / 100) * width
        const y = (node.y / 100) * height

        // Outer glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, node.size * 2)
        glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)')
        glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, node.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Inner circle
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, node.size)
        nodeGradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)')
        nodeGradient.addColorStop(1, 'rgba(99, 102, 241, 0.4)')
        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(x, y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Border
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(x, y, node.size, 0, Math.PI * 2)
        ctx.stroke()

        // Core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      flowProgress += 0.5
      requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  )
}

// Simpler SVG-based version for fallback or different uses
export function AINetworkGrid() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Floating connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal flow lines */}
        <motion.line
          x1="0%"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2, ease: 'easeInOut', repeat: Infinity },
            opacity: { duration: 0.5 },
          }}
        />
        <motion.line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 },
            opacity: { duration: 0.5, delay: 0.5 },
          }}
        />
        <motion.line
          x1="0%"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.2, ease: 'easeInOut', repeat: Infinity, delay: 1 },
            opacity: { duration: 0.5, delay: 1 },
          }}
        />
      </svg>
    </motion.div>
  )
}
