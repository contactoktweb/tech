import Link from 'next/link'

export default function ShopCta() {
  return (
    <section className="shop-cta">
      <div className="container">
        <div className="shop-cta-content animate-on-scroll">
          <h2>¿Buscas el equipo ideal?</h2>
          <p>Explora nuestro catálogo completo de hardware y software corporativo.</p>
          <Link href="/tienda" className="btn btn-primary btn-lg btn-animated">Ver Catálogo Completo</Link>
        </div>
      </div>
    </section>
  )
}
