# CLAUDE.md — Sitio web Alto Test

Contexto para retomar este proyecto sin releer todo el chat. Aquí están las
**decisiones y las trampas**, no un tutorial de React.

## Qué es

El sitio web público de **Alto Test** (ingeniería en protección contra
caídas, Santiago de Chile). Landing one-page scroll con capacidad de
crecer a multi-página (ya tiene router). Slogan: *"La altura, documentada."*
Diferenciador: no solo certifican, **gestionan el ciclo de vida completo**
de un sistema — Diagnosticar → Diseñar → Implementar → Validar → Gestionar,
y vuelve a empezar (cíclico, no lineal).

Antecedentes de marca en `/home/meraki/altotest/` (manual_marca,
carta_presentacion, antecedentes/*.docx). Recursos hermanos:
`carta_presentacion`, `manual_marca`, `pie_firma`, `propuesta_tecnica`,
`propuesta_economica` — cada uno su propio repo, este (`site`) es
`Alto-Test-Spa/site` en GitHub, rama `main`.

**Restricción de fondo del MVP:** Alto Test no tiene fotografía real
todavía (ni de personas, ni de instalaciones). Es deliberado, no un
placeholder olvidado — el sitio reemplaza la foto por la catenaria animada,
paneles de datos (Recharts) y el lenguaje de plano de ingeniería. No
agregar fotos de stock para "rellenar"; cuando haya fotos reales, se
evalúa caso a caso qué reemplazar.

## Stack

Vite + React 19 + TypeScript + Tailwind v4 (`@theme` en `src/index.css`,
sin config file) + Motion (`motion/react`, sucesor de Framer Motion) +
Recharts + `lucide-react`. A diferencia de `propuesta_tecnica` (que
rechazó React a propósito por ser un documento imprimible sin lógica),
este sitio **sí** necesita el framework: animaciones de scroll, gráficos
interactivos, formulario con estado. No es la misma decisión revertida,
es un contexto distinto.

`react-router-dom` para rutas (ver "Routing" abajo). `react-icons` está
instalado **solo** para `FaWhatsapp` — Lucide no tiene logos de marca, no
agregar más iconos de esa librería sin razón.

## Arquitectura

```
src/
  App.tsx                 Router + ErrorBoundary + Nav/Footer/WhatsAppButton persistentes
  pages/
    Home.tsx               el one-pager: Hero, Method, Services, Evidence, Positioning, Contact
    NotFound.tsx            404 con catenaria "cortada"
  components/               una sección de Home = un archivo (Hero, Method, Services, Evidence,
                             Positioning, Contact) + Nav, Footer, WhatsAppButton, ErrorBoundary,
                             ScrollToHash
  components/ui/            primitivos: Reveal, GlowBlob, GlowCard/SectionEyebrow, Chip,
                             IconBadge, Counter, Logomark (isotipo chico), Wordmark (texto+curva)
  lib/validation.ts         email + teléfono chileno — duplicado a propósito en worker/ (ver abajo)
worker/                     proyecto npm INDEPENDIENTE (su propio package.json/wrangler.jsonc),
                             Cloudflare Worker desplegado aparte, no Cloudflare Pages Functions
```

`worker/` no se instala con el `npm install` de la raíz — es otro
proyecto. Para tocarlo: `cd worker && npm install`.

## Sistema de diseño

Tokens en `src/index.css` (`@theme`), no en `tailwind.config`:
`paper #F4F5F2` · `stage #DDDED9` · `ink #10151E` · `ink-soft #1B2430` ·
`steel #4C6B7A` · `steel-light #8FA3AD` · `steel-pale #CBD5D8` ·
`steel-body #2A313B` · `signal #C2491F` (+ `signal-glow #E2723D`,
`signal-deep #8A3316` para degradés). Fuente: IBM Plex Sans + Mono
(Google Fonts, cargadas en `index.html`).

**Regla de uso del naranjo (`signal`) — aprendida en vivo, no la
reviertas sin que el usuario lo pida:** el naranjo es la EXCEPCIÓN, no la
base. Úsalo solo en: CTAs (botones de acción), la curva del Hero, y
estados que de verdad necesitan alerta (hallazgo crítico, "recertificar").
Todo lo demás — íconos, eyebrows, glows de fondo, bordes — va en acero
(`steel`) o tinta (`ink`). La primera versión abusaba del naranjo
("mono papel-acero, usar menos el naranjo — muchas competencias lo
ocupan" fue el feedback exacto) y hubo que rebalancear `IconBadge`,
`Chip`, `SectionEyebrow` y todos los `GlowBlob` de secciones oscuras.

**La catenaria (curva de marca) — acotada a propósito:** solo aparece
como isotipo (Nav/Footer, ver `Wordmark.tsx`: texto arriba, curva SVG
abajo con el mismo ancho vía `preserveAspectRatio="none"`) y como el gran
gesto visual del Hero. NO la repitas como elemento decorativo en otras
secciones — el usuario la sintió "sobreusada" cuando también estaba en el
conector del Método y en una firma en Contacto; ambas se reemplazaron
(riel recto en Método, nada en Contacto). Si se te ocurre agregar la
curva en un lugar nuevo, primero pregúntate si el Hero ya no es
suficiente protagonismo.

**Íconos:** `lucide-react`, estilo trazo fino. Nunca cascos ni escudos
genéricos (regla del manual de marca). El ícono `Anchor` de Lucide es un
ancla de barco — Alto Test trabaja con **fijaciones mecánicas** (pernos,
chapas), no anclas náuticas; se usa `Wrench` para "Implementar/anclajes".
Si necesitas un ícono nuevo, verifica primero que no tenga una lectura
literal distinta a la que quieres (mismo error, dos veces, sería vergonzoso).

**Copy:** voz de ingeniero senior hablándole a un gerente de operaciones
— directa, con datos, nunca "¡la mejor tecnología del mercado!". No
encasillar la marca en negativo contra "certificar" (se cambió
"Nuestro diferenciador no es certificar" → "no es un trabajo puntual" en
el Hero, y "una empresa que únicamente certifica" → "una intervención
aislada, sin seguimiento" en NO_SOMOS — el pedido fue vender ingeniería +
metodología, no definirse en contra de un servicio real que sí prestan).
Servicios (`Services.tsx`) es un **catálogo de ofertas concretas**
(anclajes, líneas de vida, certificación, reparaciones generales,
levantamiento de estructuras, reparación de sellos, galvanizado en
frío...) pensado para "vender" e invitar a agendar reunión — el relato
del método/proceso vive condensado en Positioning ("Así operamos") como
respaldo de la promesa, no como oferta.

**Animaciones:** `Reveal` (`components/ui/Reveal.tsx`) tiene variantes
`up | left | right | fade | scale`, repartidas con criterio por sección
(no todas iguales — pedido explícito: "que no siempre sea igual, algunos
de a lado, otros de a poco"). Al agregar una sección nueva, no copies
`variant="up"` por defecto sin pensarlo.

## Routing

`react-router-dom`, `BrowserRouter`. Una sola ruta real (`/` → `Home`) +
catch-all `*` → `NotFound`. Nav/Footer/WhatsAppButton viven en `App.tsx`
FUERA de `<Routes>` para persistir en todas las páginas, incluida la 404.

Los links internos usan `href="/#seccion"` (con barra), **no**
`href="#seccion"` — sin la barra, un link clickeado desde una ruta que no
es `/` (ej. la 404) le agrega el hash a la URL actual en vez de navegar a
home. `ScrollToHash.tsx` hace el scroll manual tras cada navegación
porque el router client-side no dispara el scroll-a-ancla nativo del
navegador en una transición sin recarga completa.

Config de fallback para hosting (ambos ya en el repo, se usa el que
corresponda al host real):
`public/_redirects` (Cloudflare Pages / Netlify) y `vercel.json`
(rewrites). Sin esto, cualquier ruta que el host no reconozca como
archivo real muestra el 404 genérico del hosting en vez del nuestro —
así se veía el sitio viejo en Vercel cuando el usuario lo probó.

## Formulario de contacto — arquitectura completa

`src/components/Contact.tsx` hace `fetch` a `VITE_CONTACT_ENDPOINT`
(Worker de Cloudflare desplegado en
`https://altotest-contact.ebookopenlib.workers.dev`), que llama a la API
de **Resend** para mandar el correo a contacto@altotest.cl (su Gmail
Workspace real).

**Por qué Resend y no Cloudflare Email Sending nativo:** Email Sending
de Cloudflare exige el plan Workers Paid (US$5/mes) para mandar a
destinatarios arbitrarios. Resend es gratis hasta 3.000 correos/mes y
altotest.cl **ya está verificado** ahí (el DNS del dominio ya vive en
Cloudflare — nameservers apuntando a Cloudflare, MX a Google Workspace,
así que agregar los registros SPF/DKIM de Resend fue trivial).

**Por qué un Worker y no llamar a Resend directo desde el navegador:**
la API key de Resend es un secreto — expuesta en JS del cliente,
cualquiera la copia y manda spam a costa de la cuenta. El Worker la
guarda como secreto de Cloudflare (`wrangler secret put RESEND_API_KEY`,
nunca en el código) y actúa de intermediario.

**Validación duplicada a propósito:** `src/lib/validation.ts` (frontend,
UX con mensajes por campo) y la misma lógica repetida en
`worker/src/index.ts` (servidor — nunca confiar en que el request vino
del formulario real; alguien puede pegarle un POST directo al Worker).
Teléfono chileno: 9 dígitos nacionales empezando en 2-9, acepta con o sin
`+56`, espacios o guiones (`isValidChileanPhone`).

**Textarea del mensaje:** auto-crece con el contenido (`autoGrow` en
`Contact.tsx`, tope 240px). Un `<textarea rows={N} resize-none>` fijo
muestra la scrollbar nativa fea apenas el texto no cabe — no vuelvas a
un alto fijo sin auto-grow.

**Plantilla del correo:** `worker/src/emailTemplate.ts`, HTML con
`<table>` e inline styles (Outlook y varios clientes de correo no
soportan flexbox/grid ni `<style>` en `<head>` de forma confiable). Si
agregas un campo nuevo al formulario, se agrega en 3 lugares:
`Contact.tsx` (input + validación + body del fetch),
`worker/src/index.ts` (`ContactPayload` + validación server-side), y
`worker/src/emailTemplate.ts` (fila nueva en la tabla + texto plano).

**Variables de entorno:** `.env` en la raíz (gitignored,
`.env.example` sí versionado): `RESEND_API_KEY` (solo la usa `worker/`
vía `wrangler secret put`, no la lee el frontend) y
`VITE_CONTACT_ENDPOINT` (la URL pública del Worker, la usa el navegador).
Después de tocar `.env` hay que reiniciar `npm run dev` — Vite lo
detecta solo pero a veces tarda un segundo restart.

## DNS y hosting — estado real, no asumir

`altotest.cl` y `www.altotest.cl` **ya están en Cloudflare** como DNS
(nameservers `carlane`/`decker.ns.cloudflare.com`), pero:
- **MX apunta a Google Workspace** (`smtp.google.com`) — no tocar, ahí
  vive el correo real de la empresa.
- **El CNAME apex hoy apunta a Vercel** (`vercel-dns-...`), igual que
  `digital-email-sig...` y `technical-propos...` (los otros proyectos
  hermanos). El dominio real sirve HOY el sitio viejo desde Vercel — este
  proyecto nuevo (`site`) **todavía no está deployado ahí**. Antes de
  asumir dónde va a vivir, pregunta; el `vercel.json` y el
  `public/_redirects` ya están listos para cualquiera de los dos casos.

## Bugs ya resueltos (no reintroducir)

| Síntoma | Causa / fix |
|---|---|
| El punto de pulso del Hero "flotaba" sobre la curva, no seguía el trazo | Se animaba un `<div>` HTML con CSS `offset-path` sobre el mismo `d=` de un `<svg preserveAspectRatio="none">` — las coordenadas no escalan igual entre un elemento HTML y el SVG estirado no-uniformemente. Fix: el punto es un `<circle>` **dentro del mismo SVG**, con su posición calculada sobre la curva Bézier con Motion (`useMotionValue` + `useTransform` + `animate`), nunca un elemento aparte. |
| La catenaria del `Wordmark` se veía pixelada/dentada | SVG chico (~90×14px) con `preserveAspectRatio="none"` estira el trazo de forma no uniforme, aliasing feo a ese tamaño. Fix: `vectorEffect="non-scaling-stroke"` en el `<path>`. |
| Nav con logo centrado: menús pegados al wordmark, sin aire | Grid de 3 columnas sin `gap` explícito — colúmnalas quedan adyacentes por diseño. Agregar `gap` al contenedor grid. |
| Ícono "ancla" para Implementar/anclajes | `Anchor` de Lucide es un ancla de barco, lectura equivocada para fijaciones mecánicas. Usar `Wrench`. |
| Chip "Aprobado" en naranjo (`variant="warn"`) | El naranjo se lee como alerta; "aprobado" es buena noticia. Usar `variant="ok"` (tono acero neutro). |
| Texto "Instalado" cortado en el timeline SVG del Servicio 05 | `viewBox` sin margen izquierdo suficiente para el `text-anchor="middle"` del primer nodo. Dar más ancho al viewBox y separar los nodos. |
| Scroll a `/#seccion` no bajaba tras una navegación completa (ej. desde la 404) | El router client-side no dispara el scroll-a-hash nativo del navegador en transiciones sin recarga. Fix: `ScrollToHash.tsx` con `useLocation` + `scrollIntoView` manual. |

## Verificación

```bash
npx tsc -p tsconfig.app.json --noEmit    # frontend
cd worker && npx tsc --noEmit -p tsconfig.json   # worker (aparte)
npm run build                             # catch-all antes de dar por terminado algo
```

No hay test suite. Para verificación visual, usar Playwright ad-hoc
(headless Chromium ya está en caché en `~/.cache/ms-playwright/`) — no
hace falta reinstalar el navegador cada vez, solo `npm install playwright`
en un scratch dir si el harness no lo trae en `node_modules`.

## Pendientes / decisiones abiertas

- **Bundle ~230KB gzip** — Recharts es el grueso. Antes de producción,
  evaluar `dynamic import()` para Evidence/Services (están below the
  fold, no necesitan estar en el chunk inicial).
- **Deploy real**: falta decidir Vercel vs Cloudflare Pages y ejecutarlo
  — ver "DNS y hosting" arriba antes de tocar nada del dominio.
- **Contenido de "Gestión con evidencia"** (KPIs, gráficos) es
  ilustrativo a propósito, marcado como tal en el propio sitio ("Vista
  ilustrativa del formato de reporte"). Conectar a datos reales cuando
  exista un cliente gestionado de verdad — no antes, y no borrar esa
  etiqueta hasta que los datos sean reales.
- Sin favicon PNG/ICO de respaldo — solo `public/favicon.svg` (isotipo
  en acero). Suficiente para navegadores modernos.
