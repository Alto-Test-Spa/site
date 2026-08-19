import { Hero } from "../components/Hero"
import { Method } from "../components/Method"
import { Services } from "../components/Services"
import { Evidence } from "../components/Evidence"
import { Positioning } from "../components/Positioning"
import { Contact } from "../components/Contact"

export function Home() {
  return (
    <>
      <Hero />
      <Method />
      <Services />
      <Evidence />
      <Positioning />
      <Contact />
    </>
  )
}
