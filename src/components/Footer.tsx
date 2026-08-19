import { Logomark } from "./ui/Logomark"

export function Footer() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.12] px-6 py-9 md:px-20">
      <div className="flex items-center gap-3">
        <Logomark tone="steel" width={28} height={12} />
        <span className="font-mono text-xs tracking-[0.02em]">
          Alto Test — La altura, documentada.
        </span>
      </div>
      <span className="font-mono text-[11px] text-steel">
        © 2026 Alto Test SpA · Santiago, Chile
      </span>
    </div>
  )
}
