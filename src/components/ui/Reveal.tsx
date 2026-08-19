import type { ReactNode } from "react"
import { motion } from "motion/react"

type Variant = "up" | "left" | "right" | "fade" | "scale"

const VARIANTS: Record<
  Variant,
  { initial: Record<string, number>; duration: number }
> = {
  up: { initial: { opacity: 0, y: 24 }, duration: 0.6 },
  left: { initial: { opacity: 0, x: -36 }, duration: 0.65 },
  right: { initial: { opacity: 0, x: 36 }, duration: 0.65 },
  fade: { initial: { opacity: 0 }, duration: 1.1 },
  scale: { initial: { opacity: 0, scale: 0.94, y: 12 }, duration: 0.55 },
}

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
}: {
  children: ReactNode
  delay?: number
  variant?: Variant
  className?: string
}) {
  const { initial, duration } = VARIANTS[variant]

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
