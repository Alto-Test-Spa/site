export function GlowBlob({
  color,
  size,
  className = "",
  drift = false,
}: {
  color: string
  size: number
  className?: string
  drift?: boolean
}) {
  return (
    <div
      className={`glow-blob ${drift ? "animate-drift" : "animate-pulse-glow"} ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  )
}
