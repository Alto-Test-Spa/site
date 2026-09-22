import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"
import { WhatsAppButton } from "./components/WhatsAppButton"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { ScrollToHash } from "./components/ScrollToHash"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import Verify from "./pages/Verify"

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="bg-paper text-ink">
          <ScrollToHash />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verifica/:folio" element={<Verify />} />
            <Route path="/verifica" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
