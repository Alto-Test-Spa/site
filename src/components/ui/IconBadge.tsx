import type { LucideIcon } from "lucide-react"

export function IconBadge({
  icon: Icon,
  tone = "steel",
  className = "",
}: {
  icon: LucideIcon
  tone?: "steel" | "glass" | "signal"
  className?: string
}) {
  const toneClasses =
    tone === "glass"
      ? "bg-paper/[0.09] text-steel-light"
      : tone === "signal"
        ? "bg-signal/10 text-signal"
        : "bg-steel/10 text-steel"

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${toneClasses} ${className}`}
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </div>
  )
}
