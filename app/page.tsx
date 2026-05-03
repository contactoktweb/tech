import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Guarantees from '@/components/Guarantees'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import SoftwareBanner from '@/components/SoftwareBanner'
import B2BBanner from '@/components/B2BBanner'
import PaymentsBanner from '@/components/PaymentsBanner'
import TrustBadges from '@/components/TrustBadges'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main>
        <Hero />
        <AboutSection />
        <Categories />
        <Guarantees />
        <ServicesSection />
        <SoftwareBanner />
        <B2BBanner />
        <PaymentsBanner />
        <TrustBadges />
      </main>
      <Footer />
    </>
  )
}
