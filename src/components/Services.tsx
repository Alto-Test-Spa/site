import {
  LayoutGrid,
  Crosshair,
  Cable,
  FileCheck2,
  Eye,
  Hammer,
  Building2,
  Waves,
  SprayCan,
  ArrowRight,
} from "lucide-react"
import { Reveal } from "./ui/Reveal"
import { GlowCard, SectionEyebrow } from "./ui/GlowCard"
import { IconBadge } from "./ui/IconBadge"
import { GlowBlob } from "./ui/GlowBlob"

const OFFERINGS = [
  {
    icon: Crosshair,
    title: "Puntos de anclaje",
    desc: "Instalación y certificación de anclajes estructurales para líneas de vida.",
  },
  {
    icon: Cable,
    title: "Líneas de vida",
    desc: "Sistemas horizontales y verticales sobre hormigón, acero o madera.",
  },
  {
    icon: FileCheck2,
    title: "Certificación de sistemas",
    desc: "Ensayos de carga Pull-Out y documentación conforme a NCh 1258 / EN 795.",
  },
  {
    icon: Eye,
    title: "Inspección y mantención",
    desc: "Revisión periódica y recertificación de sistemas ya instalados.",
  },
  {
    icon: Hammer,
    title: "Reparaciones generales",
    desc: "Corrección de hallazgos y adecuaciones sobre sistemas existentes.",
  },
  {
    icon: Building2,
    title: "Levantamiento de estructuras",
    desc: "Relevamiento técnico de cubiertas, fachadas y elementos estructurales.",
  },
  {
    icon: Waves,
    title: "Reparación de sellos",
    desc: "Sellado técnico de juntas y fachadas — no incluye limpieza de vidrios.",
  },
  {
    icon: SprayCan,
    title: "Galvanizado en frío",
    desc: "Protección anticorrosiva de elementos metálicos expuestos.",
  },
]

export function Services() {
  return (
    <div id="servicios" className="bg-stage px-6 py-24 md:px-20 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-14 max-w-2xl">
          <SectionEyebrow icon={LayoutGrid}>Nuestros servicios</SectionEyebrow>
          <h2 className="mb-4 text-3xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-4xl">
            Lo que hacemos, de la A a la Z del trabajo en altura.
          </h2>
          <p className="text-[15px] leading-relaxed text-steel-body">
            Desde el primer punto de anclaje hasta el sellado técnico de una
            fachada, cubrimos el trabajo en altura con el mismo equipo y el
            mismo estándar de ingeniería. ¿No encuentra lo que necesita en
            esta lista? Probablemente también podamos ayudarle.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERINGS.map((o, i) => (
            <Reveal
              key={o.title}
              variant={i % 2 === 0 ? "left" : "right"}
              delay={(i % 4) * 0.06}
            >
              <GlowCard className="h-full">
                <IconBadge icon={o.icon} className="mb-4" />
                <p className="mb-1.5 text-[15px] font-semibold">{o.title}</p>
                <p className="text-xs leading-relaxed text-steel">{o.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" delay={0.1}>
          <div className="relative mt-4 overflow-hidden rounded-[7px] bg-ink px-8 py-10 text-paper md:px-11">
            <div className="grid-fine grid-fine-paper" />
            <GlowBlob
              color="var(--color-steel)"
              size={340}
              className="-top-32 -right-16 opacity-40"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-lg">
                <p className="mb-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                  ¿No encuentra su necesidad en la lista?
                </p>
                <p className="text-sm leading-relaxed text-steel-light">
                  Cada servicio sigue el mismo método: diagnóstico, ejecución
                  y certificación. Cuéntenos su caso y lo revisamos juntos.
                </p>
              </div>
              <a
                href="#contacto"
                className="inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-6 py-[15px] font-mono text-xs tracking-[0.08em] text-paper uppercase shadow-[0_10px_24px_-12px_rgb(194_73_31_/_55%)] transition-[filter] hover:brightness-110"
              >
                Solicitar reunión técnica
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
