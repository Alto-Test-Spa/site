import { useState } from "react"
import type { FormEvent } from "react"
import { Mail, Globe, MapPin, Loader2, CheckCircle2 } from "lucide-react"
import { Reveal } from "./ui/Reveal"
import { SectionEyebrow } from "./ui/GlowCard"
import { GlowBlob } from "./ui/GlowBlob"

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as
  | string
  | undefined

type Status = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!CONTACT_ENDPOINT) {
      setStatus("error")
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — real visitors never fill this hidden field.
    if (data.get("website")) {
      setStatus("success")
      form.reset()
      return
    }

    setStatus("loading")
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      id="contacto"
      className="relative overflow-hidden bg-ink px-6 py-24 text-paper md:px-20 md:py-28"
    >
      <div className="grid-fine grid-fine-paper" />
      <GlowBlob
        color="var(--color-steel)"
        size={460}
        className="-top-40 -right-16 opacity-50"
        drift
      />
      <GlowBlob
        color="var(--color-steel)"
        size={340}
        className="-bottom-44 left-0 opacity-30"
        drift
      />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-16 md:grid-cols-2">
        <Reveal variant="left">
          <SectionEyebrow icon={Mail} glow>
            Hablemos
          </SectionEyebrow>
          <h2 className="mb-4.5 text-[28px] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[34px]">
            Hablemos de sus activos críticos.
          </h2>
          <p className="mb-9 max-w-sm text-[14.5px] leading-relaxed text-steel-light">
            Cuéntenos sobre su infraestructura y coordinamos un diagnóstico
            técnico inicial.
          </p>
          <div className="flex flex-col gap-2.5">
            <span className="flex items-center gap-2.5 font-mono text-[13px]">
              <Mail className="size-[15px] text-steel-light" />
              contacto@altotest.cl
            </span>
            <span className="flex items-center gap-2.5 font-mono text-[13px] text-steel-light">
              <Globe className="size-[15px] text-steel-light" />
              www.altotest.cl
            </span>
            <span className="flex items-center gap-2.5 font-mono text-[13px] text-steel-light">
              <MapPin className="size-[15px] text-steel-light" />
              Santiago · Chile
            </span>
          </div>
        </Reveal>

        <Reveal variant="right" delay={0.1}>
          {status === "success" ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 text-center">
              <CheckCircle2 className="size-10 text-steel-light" strokeWidth={1.5} />
              <p className="text-lg font-medium">Su mensaje fue enviado.</p>
              <p className="max-w-xs text-sm text-steel-light">
                Le responderemos a la brevedad para coordinar el diagnóstico
                técnico.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] size-0 opacity-0"
                aria-hidden="true"
              />
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                  NOMBRE Y EMPRESA
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={200}
                  placeholder="Ej. Javiera Muñoz — Constructora Andes"
                  className="w-full border-b border-paper/15 bg-transparent pb-2.5 text-sm text-paper placeholder-steel-light outline-none focus:border-signal-glow"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                  CORREO
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  placeholder="nombre@empresa.cl"
                  className="w-full border-b border-paper/15 bg-transparent pb-2.5 text-sm text-paper placeholder-steel-light outline-none focus:border-signal-glow"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                  CUÉNTENOS SOBRE SU ACTIVO
                </span>
                <textarea
                  name="message"
                  required
                  rows={2}
                  maxLength={5000}
                  placeholder="Tipo de infraestructura, sistemas existentes, plazos…"
                  className="w-full resize-none border-b border-paper/15 bg-transparent pb-3 text-sm text-paper placeholder-steel-light outline-none focus:border-signal-glow"
                />
              </label>

              {status === "error" && (
                <p className="text-xs text-signal-glow">
                  No pudimos enviar su mensaje. Intente nuevamente o
                  escríbanos directo a contacto@altotest.cl.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 rounded-[4px] bg-gradient-to-br from-signal to-signal-deep py-[15px] text-center font-mono text-xs tracking-[0.08em] text-paper uppercase shadow-[0_10px_24px_-12px_rgb(194_73_31_/_55%)] transition-[filter] hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {status === "loading" ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  )
}
