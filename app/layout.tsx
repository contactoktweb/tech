
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../public/style.css' // Preserve traditional styling
import '../public/shop.css' // Shop styling
import ClientAnimations from '@/components/ClientAnimations'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FANGAN TECH | Tecnología que Transforma',
  description: 'Soluciones corporativas, computadores, licencias Microsoft, soporte técnico y más.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <ClientAnimations />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
