import React from 'react';
import Image from 'next/image';

const clients = [
  {
    name: 'Metro de Bogotá',
    logo: '', // Coloca la ruta de la imagen
  },
  {
    name: 'Corporación Universitaria Minuto de Dios',
    logo: '',
  },
  {
    name: 'Unipanamericana',
    logo: '',
  },
  {
    name: 'Clínica Veterinaria Pablo Agudelo',
    logo: '',
  },
  {
    name: 'La Pizzería del Barrio',
    logo: '',
  }
];

export default function TrustedBy() {
  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10 text-center max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Tecnología que transforma vidas.
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">
          Empresas e instituciones que confían en Fangan Tech
        </h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
          Trabajamos junto a organizaciones públicas, privadas, educativas y comerciales, 
          ofreciendo soluciones tecnológicas que generan impacto real.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group min-h-[140px]"
            >
              <div className="relative w-16 h-16 mb-4 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                {client.logo ? (
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    fill 
                    className="object-contain" 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                    <span className="text-xl font-bold text-gray-400">
                      {client.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-gray-800 text-sm leading-tight">{client.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
