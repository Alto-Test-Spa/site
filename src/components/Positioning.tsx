import {
  Layers,
  Search,
  Compass,
  Wrench,
  Activity,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Reveal } from "./ui/Reveal"
import { GlowCard, SectionEyebrow } from "./ui/GlowCard"
import { GlowBlob } from "./ui/GlowBlob"

const STAGES = [
  {
    n: "01",
    icon: Search,
    label: "Diagnosticar",
    desc: "Establecemos el estado real de su infraestructura antes de proponer nada.",
  },
  {
    n: "02",
    icon: Compass,
    label: "Diseñar",
    desc: "Ingeniería y propuestas adaptadas a cada activo, no configuraciones de catálogo.",
  },
  {
    n: "03",
    icon: Wrench,
    label: "Implementar",
    desc: "Ejecutamos la solución diseñada con el mismo rigor con que la calculamos.",
  },
  {
    n: "04",
    icon: Activity,
    label: "Validar",
    desc: "Respaldamos cada sistema con ensayos de carga y certificación conforme a norma.",
  },
  {
    n: "05",
    icon: RefreshCw,
    label: "Gestionar",
    desc: "El servicio de largo plazo convierte una instalación puntual en un activo gestionado.",
  },
]

const SOMOS = [
  "Especialista técnico de ingeniería",
  "Consultor y aliado de largo plazo",
  "Referente en trazabilidad",
  "Gestor del ciclo de vida del activo",
]

const NO_SOMOS = [
  "Una empresa que sólo instala líneas de vida",
  "Una intervención aislada, sin seguimiento",
  "Un proveedor transaccional",
  "Una marca que compite por precio",
]

export function Positioning() {
  return (
    <div id="posicionamiento" className="bg-stage px-6 py-24 md:px-20 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-14 max-w-2xl">
          <SectionEyebrow icon={Layers}>Por qué Alto Test</SectionEyebrow>
          <h2 className="mb-4 text-[28px] leading-[1.16] font-semibold tracking-[-0.03em] md:text-[34px]">
            El mercado comunica producto. Nosotros gestionamos activos.
          </h2>
          <p className="text-[15px] leading-relaxed text-steel-body">
            El rubro compite mostrando catálogo y cumplimiento normativo
            como argumento único. Ambos son la puerta de entrada, no un
            diferenciador. Lo que casi nadie ofrece es la gestión y
            trazabilidad del activo a lo largo de su vida útil — ahí es
            donde trabajamos.
          </p>
        </Reveal>

        <Reveal variant="scale" className="mb-14">
          <p className="mb-5 font-mono text-[11px] tracking-[0.06em] text-steel">
            ASÍ OPERAMOS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {STAGES.map((s) => (
              <div key={s.n} className="border-t-2 border-ink/15 pt-4">
                <div className="mb-2.5 flex items-center gap-2">
                  <s.icon className="size-4 text-steel" strokeWidth={1.75} />
                  <span className="font-mono text-[11px] text-steel">
                    {s.n}
                  </span>
                </div>
                <p className="mb-1.5 text-sm font-semibold">{s.label}</p>
                <p className="text-xs leading-relaxed text-steel-body">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal variant="left">
            <GlowCard className="h-full">
              <p className="mb-4 font-mono text-[11px] tracking-[0.06em] text-steel">
                SOMOS
              </p>
              <div className="flex flex-col gap-3.5">
                {SOMOS.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="size-[18px] shrink-0 text-ink" strokeWidth={1.9} />
                    {item}
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
          <Reveal variant="right">
            <GlowCard className="h-full">
              <p className="mb-4 font-mono text-[11px] tracking-[0.06em] text-steel">
                NO SOMOS
              </p>
              <div className="flex flex-col gap-3.5 text-steel">
                {NO_SOMOS.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <XCircle className="size-[18px] shrink-0 text-steel-light" strokeWidth={1.9} />
                    {item}
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.1}>
          <div className="relative overflow-hidden rounded-[7px] bg-ink px-8 py-10 text-paper md:px-11">
            <div className="grid-fine grid-fine-paper" />
            <GlowBlob
              color="var(--color-steel)"
              size={300}
              className="top-[-140px] left-[120px] opacity-40"
            />
            <p className="relative mb-2.5 max-w-2xl text-2xl leading-[1.35] font-medium tracking-[-0.03em]">
              Ningún activo bajo nuestra gestión queda sin fecha, sin
              condición y sin responsable.
            </p>
            <p className="relative text-[13px] text-steel-light">
              No prometemos la ausencia de riesgo. Prometemos el fin de la
              incertidumbre sobre él.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
