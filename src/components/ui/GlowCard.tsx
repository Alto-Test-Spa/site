import type { ReactNode } from "react"

export function GlowCard({
  children,
  className = "",
  as: Component = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "section"
}) {
  return (
    <Component
      className={`rounded-[7px] bg-paper p-[22px] shadow-[0_1px_2px_rgb(16_21_30_/_5%),_0_16px_32px_-22px_rgb(16_21_30_/_35%)] ${className}`}
    >
      {children}
    </Component>
  )
}

export function SectionEyebrow({
  icon: Icon,
  children,
  glow = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: ReactNode
  glow?: boolean
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase ${glow ? "text-steel-light" : "text-steel"}`}
    >
      <Icon className="size-3.5 shrink-0" />
      {children}
    </p>
  )
}
