import type { Metadata, Viewport } from 'next'
import './global.css'

export const metadata: Metadata = {
  title: '¡Feliz cumpleaños! 🎂',
  description: 'Una invitación especial',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // necesario para safe-area del Dynamic Island
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}