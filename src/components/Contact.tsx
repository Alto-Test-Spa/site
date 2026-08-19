import { useState } from "react"
import type { FormEvent } from "react"
import { Mail, Globe, MapPin, Loader2, CheckCircle2 } from "lucide-react"
import { Reveal } from "./ui/Reveal"
import { SectionEyebrow } from "./ui/GlowCard"
import { GlowBlob } from "./ui/GlowBlob"
import { isValidEmail, isValidChileanPhone } from "../lib/validation"

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as
  | string
  | undefined

type Status = "idle" | "loading" | "success" | "error"
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<FieldErrors>({})

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — real visitors never fill this hidden field.
    if (data.get("website")) {
      setStatus("success")
      form.reset()
      return
    }

    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const nextErrors: FieldErrors = {}
    if (!name) nextErrors.name = "Ingrese su nombre."
    if (!isValidEmail(email)) nextErrors.email = "Ingrese un correo válido."
    if (!isValidChileanPhone(phone))
      nextErrors.phone = "Ingrese un teléfono chileno válido (+56 9 1234 5678)."
    if (!message) nextErrors.message = "Cuéntenos brevemente qué necesita."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (!CONTACT_ENDPOINT) {
      setStatus("error")
      return
    }

    setErrors({})
    setStatus("loading")
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  const fieldClass = (field: keyof FieldErrors) =>
    `w-full border-b bg-transparent pb-2.5 text-sm text-paper placeholder-steel-light outline-none focus:border-signal-glow ${
      errors[field] ? "border-signal-glow" : "border-paper/15"
    }`

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
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              noValidate
            >
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
                  maxLength={200}
                  placeholder="Ej. Javiera Muñoz — Constructora Andes"
                  onChange={() => clearError("name")}
                  className={fieldClass("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-signal-glow">{errors.name}</p>
                )}
              </label>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                    CORREO
                  </span>
                  <input
                    type="email"
                    name="email"
                    maxLength={200}
                    placeholder="nombre@empresa.cl"
                    onChange={() => clearError("email")}
                    className={fieldClass("email")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-signal-glow">{errors.email}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                    TELÉFONO
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={20}
                    placeholder="+56 9 1234 5678"
                    onChange={() => clearError("phone")}
                    className={fieldClass("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-signal-glow">{errors.phone}</p>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.1em] text-steel-light">
                  CUÉNTENOS SOBRE SU ACTIVO
                </span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={5000}
                  placeholder="Tipo de infraestructura, sistemas existentes, plazos…"
                  onChange={() => clearError("message")}
                  className={`resize-none ${fieldClass("message")}`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-signal-glow">{errors.message}</p>
                )}
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
