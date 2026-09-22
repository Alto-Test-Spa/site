import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2, QrCode, SearchX, ShieldCheck, ShieldX } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { GlowCard, SectionEyebrow } from '../components/ui/GlowCard'
import { Chip } from '../components/ui/Chip'
import { fetchVerification, type VerificationResult, type VerificationNotFound } from '../lib/verify'

export default function Verify() {
  const { folio } = useParams()
  const navigate = useNavigate()
  const [input, setInput] = useState(folio ?? '')
  const [result, setResult] = useState<VerificationResult | VerificationNotFound | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!folio) return
    setLoading(true)
    setResult(null)
    fetchVerification(folio)
      .then(setResult)
      .finally(() => setLoading(false))
  }, [folio])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (input.trim()) navigate(`/verifica/${encodeURIComponent(input.trim())}`)
  }

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-24 md:px-20">
      <div className="grid-fine grid-fine-ink" />

      <div className="relative mx-auto max-w-[560px]">
        <Reveal>
          <SectionEyebrow icon={QrCode}>Verificación pública</SectionEyebrow>
          <h1 className="mb-3 text-3xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-4xl">
            Revisa tu certificado
          </h1>
          <p className="mb-8 max-w-md text-[15px] leading-relaxed text-steel-body">
            Escribe el folio impreso en el certificado, o escanea su código QR.
          </p>

          <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-3 sm:flex-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="CPA-20260921-101532"
              className="w-full rounded-[4px] border border-ink/15 bg-transparent px-4 py-3 font-mono text-sm text-ink placeholder-steel-light outline-none focus:border-signal"
            />
            <button
              type="submit"
              className="shrink-0 rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-6 py-3 font-mono text-xs tracking-[0.08em] text-paper uppercase shadow-[0_10px_24px_-12px_rgb(194_73_31_/_55%)] transition-[filter] hover:brightness-110"
            >
              Verificar
            </button>
          </form>
        </Reveal>

        {loading && (
          <div className="flex items-center gap-2.5 text-sm text-steel-body">
            <Loader2 className="size-4 animate-spin text-steel" />
            Buscando…
          </div>
        )}

        {!loading && result && !result.found && (
          <Reveal variant="fade">
            <div className="flex items-start gap-3 rounded-[7px] bg-ink/[0.04] px-5 py-4">
              <SearchX className="mt-0.5 size-[18px] shrink-0 text-steel" strokeWidth={1.75} />
              <p className="text-[14px] leading-relaxed text-steel-body">
                No encontramos ningún certificado con ese folio, o no hay conexión con el servidor. Verifica el folio
                e inténtalo de nuevo.
              </p>
            </div>
          </Reveal>
        )}

        {!loading && result && result.found && (
          <Reveal variant="fade">
            <GlowCard>
              <div className="mb-5 flex items-center gap-2.5">
                {result.valid ? (
                  <ShieldCheck className="size-5 text-steel" strokeWidth={1.75} />
                ) : (
                  <ShieldX className="size-5 text-signal" strokeWidth={1.75} />
                )}
                <Chip variant={result.valid ? 'ok' : 'warn'}>
                  {result.valid ? 'Certificado vigente' : 'Certificado vencido'}
                </Chip>
              </div>

              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <Field label="Folio" value={result.code} mono />
                <Field label="Cliente" value={result.doc.clientName} />
                <Field label="Recinto" value={result.doc.clientAsset} />
                <Field label="Dirección" value={result.doc.address} className="sm:col-span-2" />
                <Field label="Vigencia" value={`${result.doc.certificationDate} — ${result.doc.expirationDate}`} />
                <Field label="Cantidad certificada" value={String(result.doc.certifiedCount)} />
                <Field
                  label="Normas aplicables"
                  value={result.doc.standards.join(' · ')}
                  className="sm:col-span-2"
                />
              </dl>
            </GlowCard>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  mono = false,
  className = '',
}: {
  label: string
  value: string
  mono?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="mb-1.5 font-mono text-[10px] tracking-[0.1em] text-steel-light uppercase">{label}</dt>
      <dd className={`text-[14.5px] leading-snug text-ink ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  )
}
