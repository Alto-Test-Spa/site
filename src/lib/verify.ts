const BASE_URL = import.meta.env.VITE_REPORTS_ENDPOINT

// Duplicado a propósito, mismo criterio que la validación del formulario de
// contacto de este sitio (ver CLAUDE.md, "Validación duplicada a
// propósito"): el Worker nunca calcula vigente/vencido (no interpreta
// `doc`), así que quien lo necesita lo calcula acá con los mismos nombres
// de campo que usa digital_certificate/src/types.ts (CertificateState).
function parseDdMmAaaa(value: string): Date | null {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
  if (!m) return null
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
}

export interface CertificateDoc {
  clientName: string
  clientAsset: string
  address: string
  certificationDate: string
  expirationDate: string
  deviceType: string
  installedCount: number
  certifiedCount: number
  standards: string[]
}

export interface VerificationResult {
  found: true
  code: string
  updatedAt: number
  doc: CertificateDoc
  valid: boolean
}

export interface VerificationNotFound {
  found: false
}

export async function fetchVerification(code: string): Promise<VerificationResult | VerificationNotFound> {
  const res = await fetch(`${BASE_URL}/verify/certificado/${encodeURIComponent(code)}`)
  if (!res.ok) return { found: false }
  const envelope = (await res.json()) as { code: string; updatedAt: number; doc: CertificateDoc }
  const expiration = parseDdMmAaaa(envelope.doc.expirationDate)
  // Truncar "hoy" a medianoche antes de comparar: el día completo del
  // vencimiento cuenta como vigente, mismo criterio que
  // digital_certificate/src/lib/date.ts's isStillValid() — sin esto, el
  // certificado aparece "vencido" apenas pasa la medianoche de su propio
  // día de vencimiento, mientras el editor todavía lo muestra vigente.
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const valid = expiration !== null && today.getTime() <= expiration.getTime()
  return { found: true, code: envelope.code, updatedAt: envelope.updatedAt, doc: envelope.doc, valid }
}
