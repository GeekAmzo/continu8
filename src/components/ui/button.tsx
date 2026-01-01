import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-orbitron uppercase tracking-wider font-semibold transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black border-2 border-white text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] shadow-[0_0_10px_rgba(255,255,255,0.4)]",
        destructive:
          "bg-black border-2 border-tron-orange text-tron-orange hover:bg-tron-orange/10 hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] shadow-[0_0_10px_rgba(255,107,53,0.3)]",
        outline:
          "border-2 border-white/50 bg-black/50 text-white hover:border-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]",
        secondary:
          "bg-black border-2 border-white text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] shadow-[0_0_10px_rgba(255,255,255,0.4)]",
        ghost: "hover:bg-white/10 hover:text-white text-white/70",
        link: "text-white underline-offset-4 hover:underline hover:text-white/90",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
