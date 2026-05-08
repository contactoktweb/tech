import Link from 'next/link'

export default function SoftwareBanner() {
  return (
    <section className="software-banner">
      <div className="container software-content">
        <div className="software-text animate-on-scroll reveal-skew">
          <span className="badge">Microsoft Partner</span>
          <h2>Soluciones Corporativas de Software</h2>
          <p>Licencias Microsoft CSP y ESD con activación inmediata, soporte técnico y precios competitivos para empresas de todos los tamaños.</p>
          <div className="software-logos">
            <div className="logo-badge">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="17" height="17" fill="#F25022"/>
                <rect x="21" y="2" width="17" height="17" fill="#7FBA00"/>
                <rect x="2" y="21" width="17" height="17" fill="#00A4EF"/>
                <rect x="21" y="21" width="17" height="17" fill="#FFB900"/>
              </svg>
              <span>Microsoft CSP</span>
            </div>
            <div className="logo-badge">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="17" height="17" fill="#F25022"/>
                <rect x="21" y="2" width="17" height="17" fill="#7FBA00"/>
                <rect x="2" y="21" width="17" height="17" fill="#00A4EF"/>
                <rect x="21" y="21" width="17" height="17" fill="#FFB900"/>
              </svg>
              <span>Microsoft ESD</span>
            </div>
          </div>
          <Link href="/tienda" className="btn btn-primary btn-animated btn-magnetic pulse-glow">Ver licencias disponibles</Link>
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
