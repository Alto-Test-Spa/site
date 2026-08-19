import {
  BarChart3,
  ListChecks,
  Gauge,
  Clock,
  Waypoints,
  CalendarCheck,
  TrendingUp,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts"
import { Reveal } from "./ui/Reveal"
import { GlowCard, SectionEyebrow } from "./ui/GlowCard"
import { Chip } from "./ui/Chip"
import { Counter } from "./ui/Counter"
import { IconBadge } from "./ui/IconBadge"

const FINDINGS = [
  { name: "Críticas", value: 3, color: "var(--color-signal)" },
  { name: "Importantes", value: 7, color: "var(--color-ink)" },
  { name: "Mejoras", value: 5, color: "var(--color-steel)" },
]

const COMPLIANCE_TREND = [
  { p: "M-5", v: 88 },
  { p: "M-4", v: 91 },
  { p: "M-3", v: 93 },
  { p: "M-2", v: 96 },
  { p: "M-1", v: 97 },
  { p: "Hoy", v: 98 },
]

const POINTS = [
  { id: "P-01 · Anclaje techo norte", status: "Aprobado", variant: "ok" as const },
  { id: "P-02 · Línea horizontal", status: "Aprobado", variant: "ok" as const },
  {
    id: "P-03 · Anclaje fachada",
    status: "Recertificar · 03/2027",
    variant: "warn" as const,
  },
  { id: "P-04 · Anclaje técnico", status: "22 kN · Aprobado", variant: "ok" as const },
]

const KPIS = [
  {
    icon: Gauge,
    value: 94,
    suffix: "%",
    label: "Tasa de aprobación en ensayos Pull-Out",
  },
  {
    icon: Clock,
    value: 48,
    suffix: "h",
    label: "Tiempo medio de respuesta ante hallazgo crítico",
  },
  {
    icon: Waypoints,
    value: 128,
    suffix: "",
    label: "Puntos bajo gestión activa",
  },
  {
    icon: CalendarCheck,
    value: 6,
    suffix: "",
    label: "Recertificaciones programadas en 90 días",
  },
]

export function Evidence() {
  return (
    <div id="evidencia" className="px-6 py-24 md:px-20 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <SectionEyebrow icon={BarChart3}>
              Gestión con evidencia
            </SectionEyebrow>
            <h2 className="mb-4 text-[28px] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[34px]">
              La misma disciplina con la que diseñamos un anclaje, aplicada
              a los datos.
            </h2>
            <p className="text-[15px] leading-relaxed text-steel-body">
              Así se ve un activo gestionado: cada hallazgo priorizado, cada
              ensayo con su curva de carga, cada punto con su próxima fecha
              de recertificación.
            </p>
          </div>
          <Chip variant="outline">Vista ilustrativa del formato de reporte</Chip>
        </Reveal>

        <div className="mb-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {KPIS.map((k, i) => (
            <Reveal key={k.label} variant="scale" delay={i * 0.06}>
              <GlowCard className="h-full">
                <IconBadge icon={k.icon} className="mb-4" />
                <p className="mb-1 text-[28px] font-semibold tracking-[-0.03em]">
                  <Counter value={k.value} suffix={k.suffix} />
                </p>
                <p className="text-xs leading-relaxed text-steel">
                  {k.label}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <p className="mb-10 font-mono text-[11px] text-steel">
          Ejemplo de tablero — se activa con los datos reales de cada cliente
          desde el primer diagnóstico.
        </p>

        <Reveal variant="fade" delay={0.1}>
          <blockquote className="my-10 border-l-2 border-signal pl-5">
            <p className="text-[19px] leading-[1.5] tracking-[-0.03em] italic">
              "El punto P-04 soporta 22 kN según ensayo de julio.
              Recomendamos recertificar en marzo de 2027."
            </p>
          </blockquote>
        </Reveal>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal variant="left" delay={0.15}>
            <GlowCard className="h-full">
              <SectionEyebrow icon={BarChart3}>
                Distribución de hallazgos
              </SectionEyebrow>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FINDINGS} margin={{ top: 16, right: 8, left: 8, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fill: "var(--color-steel)",
                        fontFamily: "IBM Plex Mono",
                        fontSize: 9,
                      }}
                    />
                    <YAxis hide domain={[0, 9]} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={900}>
                      {FINDINGS.map((f) => (
                        <Cell key={f.name} fill={f.color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="top"
                        fill="var(--color-ink)"
                        fontFamily="IBM Plex Mono"
                        fontSize={13}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlowCard>
          </Reveal>

          <Reveal variant="right" delay={0.2}>
            <GlowCard className="h-full">
              <SectionEyebrow icon={TrendingUp}>
                Cumplimiento normativo — últimas 6 inspecciones
              </SectionEyebrow>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={COMPLIANCE_TREND}
                    margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-steel)" stopOpacity={0.32} />
                        <stop offset="100%" stopColor="var(--color-steel)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="complianceLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--color-ink-soft)" />
                        <stop offset="100%" stopColor="var(--color-steel)" />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="p"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fill: "var(--color-steel)",
                        fontFamily: "IBM Plex Mono",
                        fontSize: 9,
                      }}
                    />
                    <YAxis hide domain={[80, 100]} />
                    <ReferenceLine y={95} stroke="var(--color-steel-pale)" strokeDasharray="3 3" />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="url(#complianceLine)"
                      strokeWidth={2.5}
                      fill="url(#complianceFill)"
                      isAnimationActive
                      animationDuration={1200}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlowCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <GlowCard>
            <SectionEyebrow icon={ListChecks}>Estado de puntos</SectionEyebrow>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {POINTS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-xs">{p.id}</span>
                  <Chip variant={p.variant} className="shrink-0">
                    {p.status}
                  </Chip>
                </div>
              ))}
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </div>
  )
}
