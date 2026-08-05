import React from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import TrustedBy from '@/components/TrustedBy'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { Target, Eye, ArrowRight, MessageCircle, Users } from 'lucide-react'

export const revalidate = 60 // Revalida cada 60 segundos (ISR)

export const metadata = {
  title: 'Nosotros | Fangan Tech',
  description: 'Conoce más sobre Fangan Tech, nuestra historia, misión, visión y valores.',
}

export default async function NosotrosPage() {
  const data = await client.fetch(aboutPageQuery).catch((err) => {
    console.error('Error fetching aboutPage:', err)
    return null
  })

  // Default values based on Sanity or fallbacks
  const title = data?.title || 'Nosotros'
  const historyTitle = data?.historyTitle || 'Nuestra Historia'
  
  const missionTitle = data?.missionTitle || 'Misión'
  const mission = data?.mission || 'En Fangan Tech desarrollamos e implementamos soluciones tecnológicas que impulsan la transformación digital de empresas, instituciones y comunidades. Creemos que la tecnología debe ser una herramienta para generar oportunidades, promover la inclusión y mejorar la calidad de vida de las personas, actuando siempre con innovación, compromiso y responsabilidad social.'
  
  const visionTitle = data?.visionTitle || 'Visión'
  const vision = data?.vision || 'Ser una empresa líder en soluciones tecnológicas en Colombia y América, reconocida por combinar innovación, excelencia e impacto social. Aspiramos a demostrar que la tecnología puede derribar barreras, fortalecer organizaciones y construir un futuro más inclusivo para todas las personas.'
  
  const valuesTitle = data?.valuesTitle || 'Nuestros Valores'
  const valuesSubtitle = data?.valuesSubtitle || 'Principios que guían nuestro trabajo día a día y nos permiten ofrecer siempre lo mejor a nuestros clientes y comunidad.'
  const values = data?.values || [
    'Innovación',
    'Inclusión',
    'Integridad',
    'Excelencia',
    'Compromiso',
    'Responsabilidad social',
    'Trabajo en equipo',
    'Empatía'
  ]
  
  const hrConsultingTitle = data?.hrConsultingTitle || 'Consultoría en RRHH'
  const hrConsultingDescription = data?.hrConsultingDescription || 'Nuestra línea de consultoría en Recursos Humanos está diseñada para potenciar el talento de tu organización, abarcando desde la atracción de los mejores perfiles hasta su desarrollo y bienestar integral.'
  const hrConsultingFeatures = data?.hrConsultingFeatures || [
    'Selección y Reclutamiento',
    'Bienestar Organizacional',
    'Capacitación y Formación',
    'Desarrollo de Talento'
  ]
  
  const teamTitle = data?.teamTitle || 'Nuestro Equipo'
  const teamSubtitle = data?.teamSubtitle || 'Conoce a las personas detrás de Fangan Tech, un equipo comprometido con la innovación y el impacto social.'
  const team = data?.team || []

  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main className="min-h-screen bg-gray-50 text-gray-900 pb-0">
        
        {/* Header Hero */}
        <section className="bg-primary text-white py-20 px-6 sm:px-10 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-2xl font-light italic opacity-90 max-w-2xl mx-auto">
              “No creamos tecnología por la tecnología. Creamos soluciones que generan oportunidades y transforman vidas.”
            </p>
          </div>
        </section>

        {/* 1. Nuestra Historia */}
        <section className="py-16 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 -mt-24 relative z-20 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{historyTitle}</h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
              <p>Fangan Tech nació con la convicción de que la tecnología debe estar al servicio de las personas.</p>
              <p>Nuestra historia comenzó al identificar que muchas organizaciones, empresas y familias enfrentaban desafíos para acceder a soluciones tecnológicas innovadoras, cercanas y realmente útiles. Más allá de desarrollar proyectos, entendimos que la verdadera innovación consiste en crear herramientas que generen oportunidades, mejoren procesos y contribuyan al bienestar de quienes las utilizan.</p>
              <p>Inspirados por experiencias de vida que nos enseñaron el valor de la inclusión, la perseverancia y el impacto positivo de la tecnología, decidimos construir una empresa con un propósito claro: desarrollar soluciones que transformen vidas.</p>
              <p>Hoy trabajamos junto a entidades públicas, instituciones educativas, empresas privadas y organizaciones sociales, aportando conocimiento, innovación y compromiso en cada proyecto.</p>
              <p>Creemos que la tecnología no solo conecta dispositivos; conecta personas, fortalece comunidades y abre nuevas posibilidades para construir un futuro mejor.</p>
              <p className="font-semibold text-primary">Ese es el propósito que impulsa cada proyecto de Fangan Tech.</p>
            </div>
            
            <div className="mt-12 p-6 bg-primary/5 rounded-xl border-l-4 border-primary text-center md:text-left">
              <p className="text-xl md:text-2xl font-light italic text-gray-800">
                “No creamos tecnología por la tecnología. Creamos soluciones que generan oportunidades y transforman vidas.”
              </p>
            </div>
          </div>
        </section>

        {/* 2 & 3. Misión y Visión */}
        <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="relative group bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-8 text-primary shadow-sm border border-primary/10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Target className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5 tracking-tight">
                {missionTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {mission}
              </p>
            </div>
          </div>

          <div className="relative group bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900/10 to-gray-900/5 flex items-center justify-center mb-8 text-gray-900 shadow-sm border border-gray-900/10 group-hover:scale-110 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                <Eye className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5 tracking-tight">
                {visionTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {vision}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Nuestros Valores */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{valuesTitle}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                {valuesSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value: string, i: number) => (
                <div key={i} className="bg-gray-50 flex flex-col items-center justify-center p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-primary hover:text-white transition-all group">
                  <span className="text-lg font-semibold group-hover:scale-110 transition-transform">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4.5 Consultoría en RRHH */}
        <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto border-b border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{hrConsultingTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {hrConsultingDescription}
              </p>
              
              <div className="space-y-4">
                {hrConsultingFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Consultoría en RRHH"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* 5. Nuestros Clientes */}
        <TrustedBy />

        {/* 6. Nuestro Equipo */}
        {team.length > 0 && (
          <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{teamTitle}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                {teamSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((person: any) => (
                <div key={person._key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                    {person.image && (
                      <Image
                        src={urlFor(person.image).url()}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
                    <p className="text-primary text-sm font-medium mt-1">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Casos de Éxito */}
        <section className="py-24 bg-gray-900 text-white border-y border-gray-800 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Casos de Éxito</h2>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Descubre cómo hemos ayudado a diversas empresas e instituciones a superar sus retos tecnológicos con soluciones que transforman resultados.
            </p>
            <Link 
              href="/casos-de-exito"
              className="inline-flex items-center justify-center bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              Ver Casos de Éxito
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 8. Contacto */}
        <section className="py-24 bg-white text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">¿Listo para transformar tu organización?</h2>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              Contáctanos hoy mismo y hablemos de cómo la tecnología puede abrir nuevas oportunidades para tu equipo y tus clientes.
            </p>
            <Link 
              href="#contacto"
              className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Contáctanos
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
