import React from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Target, Lightbulb, Users } from 'lucide-react'
import { client as sanityClient } from '@/sanity/lib/client'

export const metadata = {
  title: 'Casos de Éxito | Fangan Tech',
  description: 'Descubre cómo hemos ayudado a empresas e instituciones a superar sus retos tecnológicos.',
}

// Tipos para los datos de Sanity
interface CasoDeExito {
  _id: string
  title: string
  image?: { asset: { url: string } }
  reto: string
  solucion: string
  resultado: string
  order?: number
  client?: {
    _id: string
    name: string
  }
}

// Query GROQ para traer los casos de éxito con el cliente asociado
const CASOS_QUERY = `
  *[_type == "casoDeExito"] | order(order asc, _createdAt asc) {
    _id,
    title,
    image { asset -> { url } },
    reto,
    solucion,
    resultado,
    order,
    client -> {
      _id,
      name
    }
  }
`

// Datos de respaldo (fallback) mientras no haya datos en Sanity
const casosEstaticos: CasoDeExito[] = [
  {
    _id: 'static-1',
    title: 'Modernización de Infraestructura Educativa',
    image: { asset: { url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop' } },
    reto: 'La institución necesitaba actualizar sus laboratorios de cómputo y mejorar la conectividad en todo el campus para soportar nuevas metodologías de enseñanza híbrida.',
    solucion: 'Implementamos una solución integral que incluyó la renovación de equipos de cómputo de alto rendimiento, actualización de licencias de software y optimización de la red.',
    resultado: 'Aumento del 40% en la eficiencia de los procesos académicos, reducción significativa de tiempos de inactividad técnica y mayor satisfacción por parte de estudiantes y docentes.',
    client: { _id: 'static-client-1', name: 'Corporación Universitaria Minuto de Dios' }
  },
  {
    _id: 'static-2',
    title: 'Optimización de Gestión Clínica',
    image: { asset: { url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop' } },
    reto: 'El control de historias clínicas y el agendamiento de citas se realizaba de manera manual, lo que generaba demoras y errores en la atención.',
    solucion: 'Suministramos equipos especializados y desplegamos un sistema de gestión clínica adaptado a las necesidades específicas del centro veterinario.',
    resultado: 'Reducción del 60% en el tiempo de registro de pacientes, mejora en el control de inventarios médicos y una experiencia de servicio mucho más ágil para los clientes.',
    client: { _id: 'static-client-2', name: 'Clínica Veterinaria Pablo Agudelo' }
  }
]

export default async function CasosDeExitoPage() {
  // Obtener datos desde Sanity; si falla o está vacío, usar datos estáticos
  let casos: CasoDeExito[] = []
  try {
    const sanityData = await sanityClient.fetch<CasoDeExito[]>(CASOS_QUERY)
    casos = sanityData && sanityData.length > 0 ? sanityData : casosEstaticos
  } catch {
    casos = casosEstaticos
  }

  return (
    <>
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main className="min-h-screen bg-gray-50 text-gray-900 pb-20">
        {/* Header Hero */}
        <section className="bg-primary text-white py-24 px-6 sm:px-10 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 inline-block backdrop-blur-sm">Resultados Reales</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Casos de Éxito
            </h1>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-2xl mx-auto">
              Descubre cómo la tecnología correcta puede transformar operaciones, resolver problemas complejos y llevar a las organizaciones al siguiente nivel.
            </p>
          </div>
        </section>

        {/* Cases List */}
        <section className="py-20 px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto space-y-16">
          {casos.map((item) => {
            const imageUrl = item.image?.asset?.url
            return (
              <article
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row group hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500"
              >
                {/* Imagen */}
                <div className="w-full lg:w-2/5 relative h-72 lg:h-auto overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`Imagen del caso de éxito: ${item.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-primary/40 text-6xl font-black">{item.title.substring(0, 2)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    {/* Badge del cliente con enlace a /clientes */}
                    {item.client && (
                      <Link
                        href="/clientes"
                        className="bg-primary/90 hover:bg-primary px-3 py-1.5 text-[10px] font-bold uppercase rounded-md mb-3 inline-flex items-center gap-1.5 shadow-sm tracking-wider transition-colors duration-200 group/badge"
                        title={`Ver más sobre ${item.client.name} en nuestros clientes`}
                      >
                        <Users className="w-3 h-3 group-hover/badge:scale-110 transition-transform duration-200" />
                        {item.client.name}
                      </Link>
                    )}
                    <h2 className="text-2xl font-bold leading-tight">{item.title}</h2>
                  </div>
                </div>

                {/* Contenido */}
                <div className="w-full lg:w-3/5 p-8 sm:p-10 lg:p-12 space-y-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 -z-10"></div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-red-50 text-red-500 p-2.5 rounded-xl mr-4 shadow-sm">
                        <Target className="w-5 h-5" />
                      </span>
                      El Reto
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-[3.25rem]">{item.reto}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-50 text-blue-500 p-2.5 rounded-xl mr-4 shadow-sm">
                        <Lightbulb className="w-5 h-5" />
                      </span>
                      La Solución
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-[3.25rem]">{item.solucion}</p>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mt-10">
                    <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
                      <CheckCircle2 className="w-6 h-6 mr-3 text-primary" />
                      El Resultado
                    </h3>
                    <p className="text-gray-800 font-medium leading-relaxed pl-9">{item.resultado}</p>
                  </div>

                  {/* CTA al cliente — versión de texto debajo del resultado */}
                  {item.client && (
                    <div className="pt-2">
                      <Link
                        href="/clientes"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/70 transition-colors duration-200 group/link"
                        title={`Conoce más sobre ${item.client.name}`}
                      >
                        <Users className="w-4 h-4" />
                        <span>Ver perfil de <span className="underline underline-offset-2">{item.client.name}</span></span>
                        <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  )
}

