import { motion } from "motion/react"
import { RefreshCw, Search, Compass, Wrench, Activity } from "lucide-react"
import { Reveal } from "./ui/Reveal"
import { GlowCard, SectionEyebrow } from "./ui/GlowCard"
import { IconBadge } from "./ui/IconBadge"

const STAGES = [
  {
    n: "01",
    icon: Search,
    label: "Diagnosticar",
    desc: "Levantamiento · inspección · registro",
  },
  {
    n: "02",
    icon: Compass,
    label: "Diseñar",
    desc: "Ingeniería · priorización · propuesta",
  },
  {
    n: "03",
    icon: Wrench,
    label: "Implementar",
    desc: "Instalación · adecuaciones · mejoras",
  },
  {
    n: "04",
    icon: Activity,
    label: "Validar",
    desc: "Ensayos · certificación · documentación",
  },
  {
    n: "05",
    icon: RefreshCw,
    label: "Gestionar",
    desc: "Auditorías · mantención · recertificación",
  },
]

const THREAD_PATH = "M18,20 L1062,20"
const ANCHORS = [
  { x: 18, y: 20 },
  { x: 285, y: 20 },
  { x: 540, y: 20 },
  { x: 795, y: 20 },
  { x: 1062, y: 20 },
]

export function Method() {
  return (
    <div id="metodo" className="px-6 py-24 md:px-20 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-14 max-w-xl">
          <SectionEyebrow icon={RefreshCw}>Método Alto Test</SectionEyebrow>
          <h2 className="mb-4 text-3xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-4xl">
            Un ciclo continuo, no una visita única.
          </h2>
          <p className="text-[15px] leading-relaxed text-steel-body">
            Cinco etapas que se repiten en el tiempo: la última vuelve a
            alimentar la primera. Así se gestiona un activo — no se certifica
            una vez y se olvida.
          </p>
        </Reveal>

        <div className="relative pt-8">
          <svg
            viewBox="0 0 1080 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -top-1 left-0 hidden h-10 w-full md:block"
          >
            <motion.path
              d={THREAD_PATH}
              stroke="var(--color-steel-pale)"
              strokeWidth={1.5}
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            {ANCHORS.map((a, i) => (
              <motion.circle
                key={i}
                cx={a.x}
                cy={a.y}
                r={4}
                fill="var(--color-steel)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              />
            ))}
          </svg>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} variant="scale" delay={i * 0.08}>
                <GlowCard className="h-full">
                  <IconBadge icon={s.icon} className="mb-4" />
                  <p className="mb-1.5 font-mono text-xs text-steel">{s.n}</p>
                  <p className="mb-1 text-sm font-semibold">{s.label}</p>
                  <p className="text-xs leading-relaxed text-steel">
                    {s.desc}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          <div className="relative mt-2 hidden h-16 md:block">
            <svg
              viewBox="0 0 1080 64"
              preserveAspectRatio="none"
              className="absolute inset-0 h-16 w-full"
            >
              <motion.path
                d="M1030,4 C 1030,50 50,50 50,4"
                stroke="var(--color-steel)"
                strokeWidth={1.5}
                fill="none"
                strokeDasharray="1 6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <polygon
                points="42,10 58,10 50,-2"
                fill="var(--color-steel)"
              />
            </svg>
            <p className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-steel">
              05 vuelve a alimentar 01 · ciclo continuo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
