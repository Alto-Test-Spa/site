import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { Method } from "./components/Method"
import { Services } from "./components/Services"
import { Evidence } from "./components/Evidence"
import { Positioning } from "./components/Positioning"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { WhatsAppButton } from "./components/WhatsAppButton"

function App() {
  return (
    <div className="bg-paper text-ink">
      <Nav />
      <Hero />
      <Method />
      <Services />
      <Evidence />
      <Positioning />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
