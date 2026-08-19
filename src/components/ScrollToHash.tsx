import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [hash, pathname])

  return null
}
