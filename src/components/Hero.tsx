import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { MapPin, RefreshCw, Clock, FileCheck2, TrendingUp } from "lucide-react"
import { GlowBlob } from "./ui/GlowBlob"
import { Chip } from "./ui/Chip"

const CATENARY_PATH = "M40,55 Q450,175 860,55"
const P0 = { x: 40, y: 55 }
const P1 = { x: 450, y: 175 }
const P2 = { x: 860, y: 55 }

function quadPoint(t: number, p0: typeof P0, p1: typeof P0, p2: typeof P0) {
  const mt = 1 - t
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  }
}

function PulseDot() {
  const progress = useMotionValue(0)
  const cx = useTransform(progress, (t) => quadPoint(t, P0, P1, P2).x)
  const cy = useTransform(progress, (t) => quadPoint(t, P0, P1, P2).y)
  const opacity = useTransform(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0])

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 3.4,
      delay: 2.4,
      repeat: Infinity,
      repeatDelay: 0.8,
      ease: "easeInOut",
    })
    return controls.stop
  }, [progress])

  return (
    <>
      <motion.circle
        cx={cx}
        cy={cy}
        r={8}
        fill="var(--color-steel-light)"
        style={{ opacity }}
        filter="url(#heroBlur)"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill="var(--color-paper)"
        style={{ opacity }}
      />
    </>
  )
}

export function Hero() {
  return (
    <div
      id="top"
      className="relative overflow-hidden bg-ink px-6 pt-28 pb-20 md:px-20 md:pt-32 md:pb-24"
    >
      <div className="grid-fine grid-fine-paper" />
      <GlowBlob
        color="var(--color-steel)"
        size={480}
        className="-top-44 -right-20 opacity-80"
        drift
      />
      <GlowBlob
        color="var(--color-steel)"
        size={380}
        className="-bottom-56 -left-24 opacity-60"
        drift
      />

      <div className="relative mx-auto max-w-[1240px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-2 text-center font-mono text-[11px] tracking-[0.18em] text-steel-light uppercase"
        >
          <MapPin className="size-3.5" />
          Ingeniería en protección contra caídas · Santiago, Chile
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-6 max-w-4xl text-center text-[38px] leading-[1.1] font-semibold tracking-[-0.03em] text-paper sm:text-[46px] md:text-[60px] md:leading-[1.08]"
        >
          Nuestro diferenciador no es un trabajo puntual.
          <br />
          Es <span className="text-signal-glow">gestionar</span> el ciclo de
          vida completo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-center text-[17px] leading-relaxed text-steel-light"
        >
          Diagnóstico, diseño, instalación, certificación y mantención de
          sistemas de protección contra caídas, en un solo ciclo continuo.
          Cada punto de anclaje, con fecha, condición y responsable
          conocidos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-[52px] flex items-center justify-center gap-3.5"
        >
          <a
            href="/#contacto"
            className="rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-[26px] py-[15px] font-mono text-xs tracking-[0.08em] text-paper uppercase shadow-[0_10px_24px_-12px_rgb(194_73_31_/_55%)] transition-[filter] hover:brightness-110"
          >
            Solicitar diagnóstico técnico
          </a>
          <a
            href="/#servicios"
            className="rounded-[4px] border border-paper/25 px-6 py-[14px] font-mono text-xs tracking-[0.08em] text-paper uppercase transition-colors hover:border-paper/50"
          >
            Ver nuestros servicios
          </a>
        </motion.div>

        <div className="relative mb-9 h-[150px] sm:h-[190px]">
          <svg
            viewBox="0 0 900 190"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-signal-deep)" />
                <stop offset="55%" stopColor="var(--color-signal)" />
                <stop offset="100%" stopColor="var(--color-signal-glow)" />
              </linearGradient>
              <filter id="heroBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            <motion.path
              d={CATENARY_PATH}
              stroke="url(#heroGrad)"
              strokeWidth={16}
              fill="none"
              filter="url(#heroBlur)"
              opacity={0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d={CATENARY_PATH}
              stroke="url(#heroGrad)"
              strokeWidth={2.5}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.circle
              cx={P0.x}
              cy={P0.y}
              r={6}
              fill="var(--color-ink)"
              stroke="var(--color-signal-glow)"
              strokeWidth={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />
            <motion.circle
              cx={P2.x}
              cy={P2.y}
              r={6}
              fill="var(--color-ink)"
              stroke="var(--color-signal-glow)"
              strokeWidth={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            />

            <PulseDot />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
            <Chip icon={TrendingUp} variant="glass">
              P-04 · 22 kN · aprobado
            </Chip>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Chip icon={RefreshCw} variant="glass">
            Método en 5 etapas
          </Chip>
          <Chip icon={Clock} variant="glass">
            Ciclo continuo, no una visita
          </Chip>
          <Chip icon={FileCheck2} variant="glass">
            NCh 1258 / EN 795
          </Chip>
        </motion.div>
      </div>
    </div>
  )
}
