import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import TiendaClient from '@/components/shop/TiendaClient'
import { client } from '@/sanity/lib/client'
import { productsQuery } from '@/sanity/lib/queries'

export const revalidate = 60 // Revalida la tienda cada 60 segundos (ISR)

export default async function TiendaPage() {
  // Fetch products from Sanity server-side
  const products = await client.fetch(productsQuery).catch((err) => {
    console.error('Error al obtener productos en tienda:', err)
    return []
  })

  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main>
        <TiendaClient initialProducts={products} />
      </main>
      <Footer />
    </>
  )
}
