import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    fetchVerification(folio)
      .then(setResult)
      .finally(() => setLoading(false))
  }, [folio])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (input.trim()) navigate(`/verifica/${encodeURIComponent(input.trim())}`)
  }

  return (
    <section className="verify-page">
      <h1>Revisa tu certificado</h1>
      <p className="verify-hint">Escribe el folio impreso en el certificado, o escanea su código QR.</p>
      <form onSubmit={handleSubmit} className="verify-form">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="CPA-20260921-101532" />
        <button type="submit">Verificar</button>
      </form>

      {loading && <p>Buscando…</p>}

      {result && !result.found && <p className="verify-not-found">No encontramos ningún certificado con ese folio.</p>}

      {result && result.found && (
        <div className={`verify-result ${result.valid ? 'is-valid' : 'is-expired'}`}>
          <p className="verify-status">{result.valid ? 'Certificado vigente' : 'Certificado vencido'}</p>
          <dl>
            <div>
              <dt>Folio</dt>
              <dd>{result.code}</dd>
            </div>
            <div>
              <dt>Cliente</dt>
              <dd>{result.doc.clientName}</dd>
            </div>
            <div>
              <dt>Recinto</dt>
              <dd>{result.doc.clientAsset}</dd>
            </div>
            <div>
              <dt>Dirección</dt>
              <dd>{result.doc.address}</dd>
            </div>
            <div>
              <dt>Vigencia</dt>
              <dd>
                {result.doc.certificationDate} — {result.doc.expirationDate}
              </dd>
            </div>
            <div>
              <dt>Cantidad certificada</dt>
              <dd>{result.doc.certifiedCount}</dd>
            </div>
            <div>
              <dt>Normas aplicables</dt>
              <dd>{result.doc.standards.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  )
}
