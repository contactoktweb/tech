import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
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

import { client } from '@/sanity/lib/client'
import {
  homeHeroQuery,
  homeAboutQuery,
  homeCategoriesQuery,
  homeGuaranteesQuery,
  homeServicesQuery,
  homeSoftwareQuery,
  homeB2BQuery,
  homePaymentsQuery,
  homeTrustBadgesQuery
} from '@/sanity/lib/queries'

export const revalidate = 60 // Revalida cada 60 segundos (ISR)

export default async function Home() {
  const [
    heroData,
    aboutData,
    categoriesData,
    guaranteesData,
    servicesData,
    softwareData,
    b2bData,
    paymentsData,
    trustBadgesData
  ] = await Promise.all([
    client.fetch(homeHeroQuery).catch((err) => {
      console.error('Error fetching homeHero:', err)
      return null
    }),
    client.fetch(homeAboutQuery).catch((err) => {
      console.error('Error fetching homeAbout:', err)
      return null
    }),
    client.fetch(homeCategoriesQuery).catch((err) => {
      console.error('Error fetching homeCategories:', err)
      return null
    }),
    client.fetch(homeGuaranteesQuery).catch((err) => {
      console.error('Error fetching homeGuarantees:', err)
      return null
    }),
    client.fetch(homeServicesQuery).catch((err) => {
      console.error('Error fetching homeServices:', err)
      return null
    }),
    client.fetch(homeSoftwareQuery).catch((err) => {
      console.error('Error fetching homeSoftware:', err)
      return null
    }),
    client.fetch(homeB2BQuery).catch((err) => {
      console.error('Error fetching homeB2B:', err)
      return null
    }),
    client.fetch(homePaymentsQuery).catch((err) => {
      console.error('Error fetching homePayments:', err)
      return null
    }),
    client.fetch(homeTrustBadgesQuery).catch((err) => {
      console.error('Error fetching homeTrustBadges:', err)
      return null
    })
  ])
  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main>
        <Hero data={heroData} />
        <TrustedBy />
        <AboutSection data={aboutData} />
        <Categories data={categoriesData} />
        <Guarantees data={guaranteesData} />
        <ServicesSection data={servicesData} />
        <SoftwareBanner data={softwareData} />
        <B2BBanner data={b2bData} />
        <PaymentsBanner data={paymentsData} />
        <TrustBadges data={trustBadgesData} />
      </main>
      <Footer />
    </>
  )
}
