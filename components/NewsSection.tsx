export default function NewsSection() {
  return (
    <section id="blog" className="news-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Novedades</h2>
        <div className="news-grid">
          <article className="news-video animate-on-scroll">
            <div className="video-placeholder" tabIndex={0} role="button" aria-label="Reproducir video">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="72" height="72" stroke="currentColor" strokeWidth="2"/>
                <path d="M32 25L58 40L32 55V25Z" fill="currentColor"/>
              </svg>
            </div>
            <h3>Tecnología para tu empresa</h3>
            <p>Descubre cómo nuestras soluciones pueden transformar tu negocio</p>
          </article>
          <article className="news-blog animate-on-scroll">
            <span className="blog-category">Tendencias</span>
            <h3>Las mejores prácticas para la gestión de licencias Microsoft en 2024</h3>
            <p>Aprende a optimizar tu inversión en software y mantener el cumplimiento de licencias en tu organización con estas recomendaciones de expertos.</p>
            <div className="blog-meta">
              <span>15 de Marzo, 2024</span>
              <a href="#" className="read-more">Leer más →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
