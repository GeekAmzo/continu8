import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full border-2 border-white/40 bg-black/80 px-4 py-2 text-base text-white font-sans placeholder:text-white/50 focus-visible:outline-none focus-visible:border-white focus-visible:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
