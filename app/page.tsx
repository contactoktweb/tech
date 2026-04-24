import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Guarantees from '@/components/Guarantees'

import BentoGrid from '@/components/BentoGrid'
import SoftwareBanner from '@/components/SoftwareBanner'

import B2BBanner from '@/components/B2BBanner'
import TrustBadges from '@/components/TrustBadges'
import Footer from '@/components/Footer'
import globalScrollAnimation from '@/lib/animations'

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <Guarantees />

        <BentoGrid />
        <SoftwareBanner />

        <B2BBanner />
        <TrustBadges />
      </main>
      <Footer />
    </>
  )
}
