import { Wordmark } from "./ui/Wordmark"

const LEFT_LINKS = [
  { href: "/#metodo", label: "Método" },
  { href: "/#servicios", label: "Servicios" },
]

const RIGHT_LINKS = [
  { href: "/#evidencia", label: "Gestión con evidencia" },
  { href: "/#posicionamiento", label: "Por qué Alto Test" },
]

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="font-mono text-xs whitespace-nowrap tracking-[0.04em] text-ink transition-colors hover:text-signal"
    >
      {label}
    </a>
  )
}

export function Nav() {
  return (
    <div className="sticky top-0 z-50 flex h-[76px] items-center justify-between border-b border-ink/[0.12] bg-paper/90 px-6 backdrop-blur-md md:px-10 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-8 xl:px-14">
      <div className="hidden items-center justify-end gap-8 xl:flex">
        {LEFT_LINKS.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </div>

      <a href="/#top" className="xl:justify-self-center">
        <Wordmark tone="steel" />
      </a>

      <div className="hidden items-center justify-start gap-8 xl:flex">
        {RIGHT_LINKS.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
        <a
          href="/#contacto"
          className="ml-auto rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-5 py-2.5 font-mono text-[11px] tracking-[0.08em] text-paper uppercase whitespace-nowrap transition-[filter] hover:brightness-110"
        >
          Solicitar diagnóstico
        </a>
      </div>

      <a
        href="/#contacto"
        className="rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-5 py-2.5 font-mono text-[11px] tracking-[0.08em] text-paper uppercase whitespace-nowrap transition-[filter] hover:brightness-110 xl:hidden"
      >
        Solicitar diagnóstico
      </a>
    </div>
  )
}
