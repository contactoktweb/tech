import React from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { Target, Eye } from 'lucide-react'

export const revalidate = 60 // Revalida cada 60 segundos (ISR)

export const metadata = {
  title: 'Nosotros | Fangan Tech',
  description: 'Conoce más sobre Fangan Tech, nuestra misión, visión y valores.',
}

export default async function NosotrosPage() {
  const data = await client.fetch(aboutPageQuery).catch((err) => {
    console.error('Error fetching aboutPage:', err)
    return null
  })

  // Default values based on the prompt if not found in Sanity
  const title = data?.title || 'Nosotros'
  const introText = data?.introText || 'Fangan Tech fuera mucho más que una empresa que vende computadores, impresoras y cámaras. La visión que hemos construido juntos es que la tecnología sea una herramienta para la inclusión, inspirada en la historia de Daniel, pero sin que la empresa dependa únicamente del tema del autismo.\n\nCreo que esta misión y visión pueden darle una identidad sólida y con proyección internacional.'
  const mission = data?.mission || 'En Fangan Tech desarrollamos e implementamos soluciones tecnológicas que impulsan la transformación digital de empresas, instituciones y comunidades. Creemos que la tecnología debe ser una herramienta para generar oportunidades, promover la inclusión y mejorar la calidad de vida de las personas, actuando siempre con innovación, compromiso y responsabilidad social.'
  const vision = data?.vision || 'Ser una empresa líder en soluciones tecnológicas en Colombia y América, reconocida por combinar innovación, excelencia e impacto social. Aspiramos a demostrar que la tecnología puede derribar barreras, fortalecer organizaciones y construir un futuro más inclusivo para todas las personas.'
  const purpose = data?.purpose || 'Transformar vidas a través de la tecnología.'
  const slogans = data?.slogans || [
    'Tecnología que transforma vidas.',
    'Innovación con propósito.',
    'Technology with Purpose.',
    'Innovación sin barreras.',
    'Construyendo un futuro más inclusivo.'
  ]
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
  const signaturePhrase = data?.signaturePhrase || '“La tecnología tiene sentido cuando mejora la vida de las personas.”'
  const team = data?.team || []

  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main className="min-h-screen bg-gray-50 text-gray-900 pb-16">
        {/* Header Hero */}
        <section className="bg-primary text-white py-20 px-6 sm:px-10 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-2xl font-light italic opacity-90 max-w-2xl mx-auto">
              {signaturePhrase}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 -mt-24 relative z-20 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
            <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap">
              {introText}
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="relative group bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-8 text-primary shadow-sm border border-primary/10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Target className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5 tracking-tight">
                Misión
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
                Visión
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {vision}
              </p>
            </div>
          </div>
        </section>

        {/* Purpose y Slogans */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Nuestro Propósito</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
              {purpose}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {slogans.map((slogan: string, i: number) => (
                <span key={i} className="bg-gray-50 text-gray-700 px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-sm border border-gray-100 hover:border-primary/30 transition-colors">
                  {slogan}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Los valores de Fangan Tech</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Principios que guían nuestro trabajo día a día y nos permiten ofrecer siempre lo mejor a nuestros clientes y comunidad.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value: string, i: number) => (
              <div key={i} className="bg-white flex flex-col items-center justify-center p-6 rounded-xl shadow-sm border border-gray-100 hover:bg-primary hover:text-white transition-all group">
                <span className="text-lg font-semibold group-hover:scale-110 transition-transform">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Equipo */}
        {team.length > 0 && (
          <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto border-t border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Nuestro Equipo</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Conoce a las personas detrás de Fangan Tech, un equipo comprometido con la innovación y el impacto social.
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
      </main>
      <Footer />
    </>
  )
}
