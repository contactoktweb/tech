import ShopHero from '@/components/shop/ShopHero'
import ShopSidebar from '@/components/shop/ShopSidebar'
import ShopGrid from '@/components/shop/ShopGrid'
import ShopCta from '@/components/shop/ShopCta'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'

export default function TiendaPage() {
  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main>
        <ShopHero />
        <section className="shop-main">
          <div className="container">
            <div className="shop-layout">
              <ShopSidebar />
              <ShopGrid />
            </div>
          </div>
        </section>
        <ShopCta />
      </main>
      <Footer />
    </>
  )
}
