export default function B2BBanner() {
  return (
    <section className="b2b-banner">
      <div className="container b2b-content">
        <div className="b2b-text animate-on-scroll">
          <h2>Tecnología confiable para tu empresa</h2>
          <p>Soluciones integrales de hardware, software y servicios para impulsar la productividad y competitividad de tu negocio.</p>
          <a href="#" className="btn btn-primary btn-lg btn-animated">Soluciones Corporativas</a>
        </div>
        <div className="b2b-images animate-on-scroll">
          <div className="b2b-image-grid">
            <div className="b2b-img b2b-img-1">
              <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="100" fill="currentColor" opacity="0.1"/>
                <rect x="20" y="20" width="40" height="30" stroke="currentColor" strokeWidth="2"/>
                <rect x="70" y="25" width="60" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="70" y="40" width="40" height="6" fill="currentColor" opacity="0.2"/>
                <rect x="25" y="60" width="30" height="30" stroke="currentColor" strokeWidth="2"/>
                <path d="M35 75L40 80L50 70" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="b2b-img b2b-img-2">
              <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="100" fill="currentColor" opacity="0.1"/>
                <rect x="30" y="20" width="40" height="40" stroke="currentColor" strokeWidth="2"/>
                <path d="M42 40L48 46L58 36" stroke="currentColor" strokeWidth="2"/>
                <rect x="80" y="30" width="50" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="80" y="45" width="35" height="6" fill="currentColor" opacity="0.2"/>
                <rect x="20" y="70" width="110" height="15" fill="currentColor" opacity="0.15"/>
              </svg>
            </div>
            <div className="b2b-img b2b-img-3">
              <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="100" fill="currentColor" opacity="0.1"/>
                <path d="M30 70L50 50L70 60L100 30L120 40" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="47" y="47" width="6" height="6" fill="currentColor"/>
                <rect x="67" y="57" width="6" height="6" fill="currentColor"/>
                <rect x="97" y="27" width="6" height="6" fill="currentColor"/>
                <rect x="117" y="37" width="6" height="6" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
