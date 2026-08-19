import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

type Variant = "default" | "glass" | "glass-accent" | "ok" | "warn" | "outline"

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-ink/[0.055] text-ink",
  glass: "bg-paper/[0.08] text-paper border border-paper/15 backdrop-blur-sm",
  "glass-accent":
    "bg-signal/25 text-paper border border-signal/40 backdrop-blur-sm",
  ok: "bg-steel/10 text-ink",
  warn: "bg-signal text-paper",
  outline: "border border-ink/10 text-ink",
}

export function Chip({
  icon: Icon,
  children,
  variant = "default",
  className = "",
}: {
  icon?: LucideIcon
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-[7px] rounded-full px-3.5 py-[7px] font-mono text-[11px] tracking-[0.02em] whitespace-nowrap ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {Icon && (
        <Icon
          className={
            variant === "glass"
              ? "size-3.5 shrink-0 text-steel-light"
              : variant === "glass-accent" || variant === "warn"
                ? "size-3.5 shrink-0 text-paper"
                : "size-3.5 shrink-0 text-steel"
          }
        />
      )}
      {children}
    </span>
  )
}
