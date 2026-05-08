export default function TrustBadges() {
  return (
    <section className="trust-badges">
      <div className="container">
        <div className="badges-grid animate-on-scroll stagger-children">
          <div className="badge-item">
            <div className="badge-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L40 12V22C40 32 33 40 24 44C15 40 8 32 8 22V12L24 4Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 24L22 30L32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
              </svg>
            </div>
            <h4>Autenticidad Garantizada</h4>
            <p>Productos 100% originales</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 14V24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
              </svg>
            </div>
            <h4>Calidad Oficial</h4>
            <p>Garantía de fábrica</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
                <rect x="18" y="18" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
                <path d="M26 26H40V40" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h4>Soporte Especializado</h4>
            <p>Expertos a tu servicio</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="32" height="24" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 20H40" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="26" width="12" height="4" fill="currentColor"/>
              </svg>
            </div>
            <h4>Tiempos Claros de Respuesta</h4>
            <p>Entregas puntuales</p>
          </div>
        </div>
      </div>
    </section>
  )
}
