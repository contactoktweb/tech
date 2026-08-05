import React from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import Image from 'next/image'

export const metadata = {
  title: 'Nuestros Clientes | Fangan Tech',
  description: 'Empresas e instituciones que confían en Fangan Tech para su transformación digital.',
}

const clients = [
  {
    name: 'Metro de Bogotá',
    description: 'Soluciones tecnológicas para uno de los proyectos de infraestructura más importantes de Colombia.',
    logo: '', // Coloca aquí la ruta de la imagen, ej: '/logos/metro-bogota.png'
    color: 'from-blue-500/20 to-primary/10'
  },
  {
    name: 'Corporación Universitaria Minuto de Dios',
    description: 'Suministro de equipos y soluciones tecnológicas para fortalecer los procesos educativos.',
    logo: '',
    color: 'from-yellow-500/20 to-primary/10'
  },
  {
    name: 'Unipanamericana',
    description: 'Apoyo tecnológico para entornos académicos e institucionales.',
    logo: '',
    color: 'from-orange-500/20 to-primary/10'
  },
  {
    name: 'Clínica Veterinaria Pablo Agudelo',
    description: 'Equipamiento y soluciones para optimizar la atención y la gestión clínica.',
    logo: '',
    color: 'from-green-500/20 to-primary/10'
  },
  {
    name: 'La Pizzería del Barrio',
    description: 'Tecnología para fortalecer las operaciones y el servicio al cliente.',
    logo: '',
    color: 'from-red-500/20 to-primary/10'
  }
];

export default function ClientesPage() {
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
            <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 inline-block backdrop-blur-sm">Confianza</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Nuestros Clientes
            </h1>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-2xl mx-auto">
              Empresas e instituciones que confían en Fangan Tech para impulsar su transformación tecnológica y alcanzar nuevos niveles de eficiencia.
            </p>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-16 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20 -mt-16">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 group flex flex-col h-full"
              >
                <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner overflow-hidden`}>
                  {client.logo ? (
                    <Image 
                      src={client.logo} 
                      alt={`Logo de ${client.name}`} 
                      fill 
                      className="object-contain p-3" 
                      sizes="(max-width: 768px) 100vw, 96px"
                    />
                  ) : (
                    <span className="text-2xl font-black text-gray-800/40 uppercase tracking-widest">
                      {client.name.substring(0, 2)}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{client.name}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
