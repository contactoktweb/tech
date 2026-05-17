'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { CheckCircle2, XCircle, Clock, ArrowRight, ShoppingBag } from 'lucide-react'

function ResultadoContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading')
  const [details, setDetails] = useState<any>(null)

  useEffect(() => {
    const ref_payco = searchParams.get('ref_payco') || searchParams.get('x_ref_payco')
    
    if (ref_payco) {
      fetch(`https://secure.epayco.co/validation/v1/reference/${ref_payco}`)
        .then(res => res.json())
        .then(response => {
          if (response.success && response.data) {
            const data = response.data
            setDetails(data)
            
            // Codigos ePayco: 1=Aceptada, 2=Rechazada, 3=Pendiente, 4=Fallida
            const code = parseInt(data.x_cod_response)
            if (code === 1) {
              setStatus('success')
              clearCart()
            } else if (code === 3) {
              setStatus('pending')
              clearCart() // Opcional: limpiar si queda pendiente
            } else {
              setStatus('error')
            }
          } else {
            setStatus('error')
          }
        })
        .catch(() => setStatus('error'))
    } else {
      // Si no hay referencia, verificamos si viene un status directo (fallback)
      const directStatus = searchParams.get('status')
      if (directStatus === 'success') {
        setStatus('success')
        clearCart()
      } else {
        setStatus('error')
      }
    }
  }, [searchParams, clearCart])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black uppercase tracking-widest text-sm">Verificando Pago...</p>
          </div>
        )
      case 'success':
        return (
          <div className="brutalist-card p-8 md:p-12 text-center max-w-2xl mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_#10b981]">
            <CheckCircle2 className="w-20 h-20 text-[#10b981] mx-auto mb-6" strokeWidth={2.5} />
            <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">¡Pago Exitoso!</h1>
            <p className="text-gray-600 font-medium text-lg mb-8">
              Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles de tu compra.
            </p>
            {details && (
              <div className="bg-gray-50 border-2 border-black p-6 mb-8 text-left">
                <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <span className="text-xs font-bold uppercase text-gray-400">Referencia</span>
                  <span className="font-black text-sm">#{details.x_id_invoice || details.x_ref_payco}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <span className="text-xs font-bold uppercase text-gray-400">Valor</span>
                  <span className="font-black text-sm text-[#10b981]">${new Intl.NumberFormat('es-CO').format(details.x_amount)} {details.x_currency_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold uppercase text-gray-400">Fecha</span>
                  <span className="font-black text-sm">{details.x_transaction_date}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tienda" className="brutalist-button py-4 px-8 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                Seguir Comprando <ShoppingBag size={20} />
              </Link>
            </div>
          </div>
        )
      case 'pending':
        return (
          <div className="brutalist-card p-8 md:p-12 text-center max-w-2xl mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_#f59e0b]">
            <Clock className="w-20 h-20 text-[#f59e0b] mx-auto mb-6" strokeWidth={2.5} />
            <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Pago Pendiente</h1>
            <p className="text-gray-600 font-medium text-lg mb-8">
              Tu entidad financiera está procesando el pago. Te notificaremos en cuanto se confirme.
            </p>
            <Link href="/" className="brutalist-button py-4 px-8 font-black uppercase tracking-widest inline-block">
              Volver al Inicio
            </Link>
          </div>
        )
      case 'error':
      default:
        return (
          <div className="brutalist-card p-8 md:p-12 text-center max-w-2xl mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_#ef4444]">
            <XCircle className="w-20 h-20 text-[#ef4444] mx-auto mb-6" strokeWidth={2.5} />
            <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">¡Ups! Algo falló</h1>
            <p className="text-gray-600 font-medium text-lg mb-8">
              No pudimos procesar tu pago. Puede que haya un problema con tu tarjeta o que la transacción fuera cancelada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pagos" className="brutalist-button py-4 px-8 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                Intentar de nuevo <ArrowRight size={20} />
              </Link>
              <Link href="/" className="brutalist-button-secondary py-4 px-8 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                Ir al Inicio
              </Link>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#fafafa]">
      <style dangerouslySetInnerHTML={{__html: `
        .brutalist-button {
          background-color: #000 !important;
          color: #fff !important;
          border: 3px solid #000 !important;
          box-shadow: 6px 6px 0 0 #000 !important;
          transition: all 0.2s ease !important;
        }
        .brutalist-button:hover {
          background-color: #ff5500 !important;
          box-shadow: none !important;
          transform: translate(4px, 4px) !important;
        }
        .brutalist-button-secondary {
          background-color: transparent !important;
          color: #000 !important;
          border: 3px solid #000 !important;
          transition: all 0.2s ease !important;
        }
        .brutalist-button-secondary:hover {
          background-color: #f3f4f6 !important;
        }
        .brutalist-card {
          background-color: #ffffff !important;
          border: 4px solid #000 !important;
        }
      `}} />
      <div className="container mx-auto">
        {renderContent()}
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

export default function ResultadoPagoPage() {
  return (
    <>
      <TopBar />
      <Header />
      <Suspense fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ResultadoContent />
      </Suspense>
      <Footer />
    </>
  )
}
