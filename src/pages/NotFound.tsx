import { Link } from "react-router-dom"
import { Reveal } from "../components/ui/Reveal"

export function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-paper px-6 py-24 text-center md:px-20">
      <div className="grid-fine grid-fine-ink" />

      <Reveal className="relative flex flex-col items-center">
        <p className="mb-6 font-mono text-[11px] tracking-[0.18em] text-signal uppercase">
          Error 404
        </p>

        <svg width="220" height="70" viewBox="0 0 220 70" className="mb-8" aria-hidden="true">
          <path
            d="M10,20 Q45,45 78,30"
            stroke="var(--color-steel)"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity={0.6}
          />
          <path
            d="M142,30 Q175,45 210,20"
            stroke="var(--color-steel)"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity={0.6}
          />
          <circle cx={10} cy={20} r={4} fill="var(--color-ink)" />
          <circle cx={210} cy={20} r={4} fill="var(--color-ink)" />
          <circle cx={80} cy={31} r={2.5} fill="var(--color-signal)" />
          <circle cx={140} cy={31} r={2.5} fill="var(--color-signal)" />
        </svg>

        <h1 className="mb-4 max-w-lg text-3xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-4xl">
          Esta página no está en nuestros registros.
        </h1>
        <p className="mb-10 max-w-md text-[15px] leading-relaxed text-steel-body">
          El enlace puede estar roto o la página puede haberse movido.
          Vuelva al inicio o escríbanos directo si buscaba algo puntual.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-6 py-[15px] font-mono text-xs tracking-[0.08em] text-paper uppercase shadow-[0_10px_24px_-12px_rgb(194_73_31_/_55%)] transition-[filter] hover:brightness-110"
          >
            Volver al inicio
          </Link>
          <a
            href="mailto:contacto@altotest.cl"
            className="rounded-[4px] border border-ink/20 px-6 py-[14px] font-mono text-xs tracking-[0.08em] text-ink uppercase transition-colors hover:border-ink/40"
          >
            contacto@altotest.cl
          </a>
        </div>
      </Reveal>
    </div>
  )
}
