import { FaWhatsapp } from "react-icons/fa"
import { motion } from "motion/react"

const WHATSAPP_URL =
  "https://wa.me/56930754624?text=" +
  encodeURIComponent(
    "Hola, quisiera información sobre los servicios de Alto Test.",
  )

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_28px_-8px_rgba(37,211,102,0.55)] md:right-8 md:bottom-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <FaWhatsapp className="relative size-7 text-white" />
    </motion.a>
  )
}
