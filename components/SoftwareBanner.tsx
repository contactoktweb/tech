import Link from 'next/link'

interface LogoItem {
  name: string
  logoSvg?: string
}

interface SoftwareBannerProps {
  data?: {
    badge?: string
    title?: string
    description?: string
    logos?: LogoItem[]
    ctaText?: string
    ctaLink?: string
  } | null
}

export default function SoftwareBanner({ data }: SoftwareBannerProps) {
  const badge = data?.badge || 'Microsoft Partner'
  const title = data?.title || 'Soluciones Corporativas de Software'
  const description = data?.description || 'Licencias Microsoft CSP y ESD con activación inmediata, soporte técnico y precios competitivos para empresas de todos los tamaños.'
  const logos = data?.logos && data.logos.length > 0 ? data.logos : [{ name: 'Microsoft CSP' }, { name: 'Microsoft ESD' }]
  const ctaText = data?.ctaText || 'Ver licencias disponibles'
  const ctaLink = data?.ctaLink || '/tienda'

  return (
    <section className="software-banner">
      <div className="container software-content">
        <div className="software-text animate-on-scroll reveal-skew">
          <span className="badge">{badge}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="software-logos">
            {logos.map((logo, idx) => (
              <div key={idx} className="logo-badge">
                {logo.logoSvg ? (
                  <div dangerouslySetInnerHTML={{ __html: logo.logoSvg }} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                ) : (
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="17" height="17" fill="#F25022"/>
                    <rect x="21" y="2" width="17" height="17" fill="#7FBA00"/>
                    <rect x="2" y="21" width="17" height="17" fill="#00A4EF"/>
                    <rect x="21" y="21" width="17" height="17" fill="#FFB900"/>
                  </svg>
                )}
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
          <Link href={ctaLink} className="btn btn-primary btn-animated btn-magnetic pulse-glow">{ctaText}</Link>
        </div>
        <div className="software-graphic animate-on-scroll reveal-perspective">
          <div className="device-stack">
            <div className="device device-laptop">
              <div className="device-screen"></div>
            </div>
            <div className="device device-tablet">
              <div className="device-screen"></div>
            </div>
            <div className="device device-phone">
              <div className="device-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
