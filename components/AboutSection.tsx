import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="nosotros" className="about-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Conócenos</h2>
        <p className="section-subtitle animate-on-scroll">Tecnología que Transforma: Nuestra Misión y Visión</p>
        
        <div className="about-grid">
          {/* Left Cards */}
          <div className="about-side-cards animate-on-scroll reveal-left">
            <article className="about-card">
              <div className="about-card-icon animate-float">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Infraestructura TI</h3>
              <p>Optimizamos la base tecnológica de su organización con soluciones escalables.</p>
            </article>
            <article className="about-card">
              <div className="about-card-icon animate-float">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Seguridad Digital</h3>
              <p>Protección integral para sus activos de información más críticos.</p>
            </article>
          </div>

          {/* Central Image */}
          <div className="about-center-visual animate-on-scroll reveal-blur">
            <div className="about-image-wrapper animate-on-scroll reveal-geometric" data-parallax data-speed="0.05">
              <Image 
                src="/nosotros-center.png" 
                alt="Fangan Tech Team" 
                width={600} 
                height={600}
                className="about-image"
                priority
              />
              
            </div>
          </div>

          {/* Right Cards */}
          <div className="about-side-cards animate-on-scroll reveal-right">
            <article className="about-card">
              <div className="about-card-icon animate-float">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Soporte Experto</h3>
              <p>Acompañamiento técnico continuo por profesionales certificados.</p>
            </article>
            <article className="about-card">
              <div className="about-card-icon animate-float">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Eficiencia Operativa</h3>
              <p>Reducimos tiempos de inactividad mediante mantenimiento proactivo.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
