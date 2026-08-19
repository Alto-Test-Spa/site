function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const INK = "#10151E"
const PAPER = "#F4F5F2"
const STEEL = "#4C6B7A"
const STEEL_LIGHT = "#8FA3AD"
const SIGNAL = "#C2491F"
const LINE = "#E3E4DF"
const MONO = "'Courier New', Courier, monospace"
const SANS =
  "Arial, Helvetica, 'Segoe UI', sans-serif"

export function renderContactEmail(input: {
  name: string
  email: string
  message: string
  company?: string
}): { html: string; text: string } {
  const { name, email, message, company } = input

  const receivedAt = new Date().toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "long",
    timeStyle: "short",
  })

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCompany = company ? escapeHtml(company) : ""
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>")
  const replySubject = encodeURIComponent(`Re: consulta en altotest.cl`)

  const text = [
    "NUEVA CONSULTA — ALTO TEST",
    "",
    `Nombre / empresa: ${name}${company ? ` (${company})` : ""}`,
    `Correo: ${email}`,
    `Recibido: ${receivedAt}`,
    "",
    "Mensaje:",
    message,
    "",
    "—",
    "Enviado automáticamente desde el formulario de contacto de altotest.cl",
  ].join("\n")

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nueva consulta — Alto Test</title>
</head>
<body style="margin:0; padding:0; background-color:${PAPER};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Nueva consulta de ${safeName} — ${safeEmail}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background-color:#FFFFFF; border:1px solid ${LINE};">

          <tr>
            <td style="background-color:${INK}; padding:28px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${MONO}; font-size:11px; letter-spacing:2px; color:${SIGNAL}; text-transform:uppercase; padding-bottom:8px;">
                    Nueva consulta web
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${MONO}; font-size:18px; font-weight:bold; letter-spacing:1px; color:#FFFFFF;">
                    ALTO TEST
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${SANS}; font-size:20px; font-weight:bold; color:${INK}; padding-bottom:6px;">
                    Alguien quiere hablar de su proyecto.
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${SANS}; font-size:12px; color:${STEEL}; padding-bottom:28px;">
                    Recibido el ${receivedAt} · hora de Santiago
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${LINE};">
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid ${LINE};">
                    <div style="font-family:${MONO}; font-size:10px; letter-spacing:1.5px; color:${STEEL}; text-transform:uppercase; padding-bottom:4px;">
                      Nombre y empresa
                    </div>
                    <div style="font-family:${SANS}; font-size:15px; color:${INK};">
                      ${safeName}${safeCompany ? ` — ${safeCompany}` : ""}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="font-family:${MONO}; font-size:10px; letter-spacing:1.5px; color:${STEEL}; text-transform:uppercase; padding-bottom:4px;">
                      Correo
                    </div>
                    <div style="font-family:${SANS}; font-size:15px; color:${INK};">
                      <a href="mailto:${safeEmail}" style="color:${INK}; text-decoration:none;">${safeEmail}</a>
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
                <tr>
                  <td style="font-family:${MONO}; font-size:10px; letter-spacing:1.5px; color:${STEEL}; text-transform:uppercase; padding-bottom:8px;">
                    Mensaje
                  </td>
                </tr>
                <tr>
                  <td style="background-color:${PAPER}; border-left:3px solid ${SIGNAL}; padding:16px 20px; font-family:${SANS}; font-size:14px; line-height:1.6; color:${INK};">
                    ${safeMessage}
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                <tr>
                  <td bgcolor="${SIGNAL}" style="border-radius:4px;">
                    <a href="mailto:${safeEmail}?subject=${replySubject}"
                       style="display:inline-block; padding:13px 26px; font-family:${MONO}; font-size:12px; letter-spacing:1px; color:#FFFFFF; text-decoration:none; text-transform:uppercase;">
                      Responder por correo
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 36px; border-top:1px solid ${LINE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${SANS}; font-size:11px; line-height:1.6; color:${STEEL_LIGHT};">
                    Enviado automáticamente desde el formulario de contacto de
                    <a href="https://www.altotest.cl" style="color:${STEEL_LIGHT};">altotest.cl</a>.
                    Para responder, use el botón de arriba o escriba directo a
                    <a href="mailto:contacto@altotest.cl" style="color:${STEEL_LIGHT};">contacto@altotest.cl</a>.
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${SANS}; font-size:11px; font-style:italic; color:${STEEL_LIGHT}; padding-top:10px;">
                    Alto Test — La altura, documentada.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { html, text }
}
