import { Component, type ReactNode } from "react"

function CrashFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.18em] text-signal uppercase">
        Algo se rompió
      </p>
      <h1 className="max-w-md text-2xl leading-[1.2] font-semibold tracking-[-0.03em]">
        Tuvimos un problema técnico de nuestro lado.
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-steel-body">
        Intente recargar la página. Si el problema sigue, escríbanos a{" "}
        <a href="mailto:contacto@altotest.cl" className="text-ink underline">
          contacto@altotest.cl
        </a>
        .
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-[4px] bg-gradient-to-br from-signal to-signal-deep px-6 py-[14px] font-mono text-xs tracking-[0.08em] text-paper uppercase transition-[filter] hover:brightness-110"
      >
        Recargar página
      </button>
    </div>
  )
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Uncaught error in app tree:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return <CrashFallback />
    }
    return this.props.children
  }
}
