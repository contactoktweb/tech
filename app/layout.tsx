
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../public/style.css' // Preserve traditional styling
import '../public/shop.css' // Shop styling
import ClientAnimations from '@/components/ClientAnimations'
import { Providers } from '@/components/Providers'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

import { Toaster } from '@/components/ui/toaster'
import FloatingSidebar from '@/components/FloatingSidebar'
import BottomNav from '@/components/BottomNav'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(settingsQuery).catch(() => null)
  const title = settings?.title || 'FANGAN TECH | Expertos en Hardware Corporativo y Licencias Microsoft'
  const description = settings?.description || 'Soluciones integrales en tecnología: Hardware, Licenciamiento Microsoft y Soporte Técnico especializado para empresas.'
  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : 'https://www.fangantech.com.co/logo.png'

  return {
    title: {
      default: title,
      template: `%s | FANGAN TECH`
    },
    description,
    keywords: [
      'Hardware Corporativo',
      'Licencias Microsoft',
      'Microsoft CSP Colombia',
      'Soporte TI Medellín',
      'Computadores para Empresas',
      'Infraestructura Tecnológica',
      'Venta de Portátiles',
      'Soluciones Digitales'
    ],
    authors: [{ name: 'K&T Code', url: 'https://www.kytcode.lat' }],
    creator: 'K&T Code',
    publisher: 'FANGAN TECH',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.fangantech.com.co'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.fangantech.com.co',
      siteName: 'FANGAN TECH',
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl],
    },
    icons: {
      icon: settings?.favicon ? urlFor(settings.favicon).url() : '/favicon.ico',
      apple: '/apple-icon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

async function JsonLd() {
  const settings = await client.fetch(settingsQuery).catch(() => null)
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FANGAN TECH",
    "url": "https://www.fangantech.com.co",
    "logo": settings?.logo ? urlFor(settings.logo).url() : "https://www.fangantech.com.co/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings?.contacto?.telefono || "+573144874534",
      "contactType": "customer service",
      "email": settings?.contacto?.email || "ventas@fangantech.com.co",
      "areaServed": "CO",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      settings?.redesSociales?.facebook || "https://facebook.com/fangantech",
      settings?.redesSociales?.instagram || "https://instagram.com/fangantech",
      settings?.redesSociales?.tiktok || "https://tiktok.com/@fangantech"
    ]
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FANGAN TECH",
    "image": settings?.logo ? urlFor(settings.logo).url() : "https://www.fangantech.com.co/logo.png",
    "@id": "https://www.fangantech.com.co",
    "url": "https://www.fangantech.com.co",
    "telephone": settings?.contacto?.telefono || "+573144874534",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.contacto?.direccion || "Cl. 37 Sur #78b 35, Oficina 401",
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia",
      "postalCode": "050030",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.1759,
      "longitude": -75.5847
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <JsonLd />
        <Providers>
          {children}
          <Toaster />
          <FloatingSidebar />
          <BottomNav />
        </Providers>
        <ClientAnimations />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
