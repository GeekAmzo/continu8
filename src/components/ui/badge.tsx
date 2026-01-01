import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 text-xs font-orbitron uppercase tracking-wider transition-all duration-300 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-white bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:bg-white/20",
        secondary:
          "border-white/50 bg-transparent text-white hover:border-white hover:bg-white/5",
        destructive:
          "border-tron-orange bg-tron-orange/10 text-tron-orange shadow-[0_0_10px_rgba(255,107,53,0.3)] hover:bg-tron-orange/20",
        outline: "border-white/30 bg-transparent text-white hover:border-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
