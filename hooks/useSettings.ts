'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export interface Settings {
  favicon: any
  logo: any
  logoLargo: any
  contacto: {
    telefono: string
    email: string
    direccion: string
  }
  whatsapp: {
    numero: string
    mensaje: string
  }
  redesSociales: {
    facebook: string
    instagram: string
    tiktok: string
  }
  googleMaps: string
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await client.fetch(settingsQuery)
        setSettings(data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const getLogoUrl = () => {
    if (settings?.logo) return urlFor(settings.logo).url()
    return '/logo-largo.png' // Fallback
  }

  const getLogoLargoUrl = () => {
    if (settings?.logoLargo) return urlFor(settings.logoLargo).url()
    return '/logo-largo.png' // Fallback
  }

  const getFaviconUrl = () => {
    if (settings?.favicon) return urlFor(settings.favicon).url()
    return '/favicon.ico' // Fallback
  }

  return { settings, loading, getLogoUrl, getLogoLargoUrl, getFaviconUrl }
}
