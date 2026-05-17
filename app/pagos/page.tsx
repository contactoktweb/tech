'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingSidebar from '@/components/FloatingSidebar'
import { useCart } from '@/context/CartContext'
import { colombianDepartments, citiesByDepartment } from '@/lib/locations'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'

type Step = 'cart' | 'info' | 'payment' | 'thanks'

export const dynamic = 'force-dynamic'

function PagosContent() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>(searchParams.get('status') === 'success' ? 'thanks' : 'cart')
  const [paymentMethod, setPaymentMethod] = useState<string>('card')
  const [selectedDept, setSelectedDept] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    doc: '',
    email: '',
    phone: '',
    address: ''
  })

  React.useEffect(() => {
    if (step === 'thanks') {
      clearCart()
    }
  }, [step, clearCart])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val)
  }

  const handleNextStep = (nextStep: Step) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (nextStep === 'thanks') {
      // Logic handled by ePayco response redirect
    }
    setStep(nextStep)
  }

  const handleEpaycoPayment = async () => {
    // @ts-ignore
    const epaycoInstance = window.ePayco;

    if (!epaycoInstance) {
      alert('La pasarela de pago se está terminando de cargar. Por favor, intenta de nuevo en un segundo.')
      return
    }

    setIsProcessing(true)
    const invoiceNum = `ORD-${Date.now()}`

    try {
      // 1. Crear el pedido en la base de datos de Sanity primero
      const res = await fetch('/api/pedidos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invoice: invoiceNum,
          total: cartTotal,
          customer: {
            name: billingInfo.name,
            email: billingInfo.email,
            doc: billingInfo.doc,
            phone: billingInfo.phone,
            address: billingInfo.address,
            city: selectedCity,
            department: selectedDept
          },
          items: cart
        })
      })

      if (!res.ok) {
        throw new Error('No se pudo registrar el pedido en Sanity')
      }

      // 2. Configurar y abrir ePayco
      const handler = epaycoInstance.checkout.configure({
        key: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY,
        test: process.env.NEXT_PUBLIC_EPAYCO_TEST === 'true'
      })

      const data = {
        name: "Compra Tech Shop",
        description: cart.map(item => `${item.quantity}x ${item.name}`).join(', '),
        invoice: invoiceNum,
        currency: "cop",
        amount: cartTotal.toString(),
        tax_base: "0",
        tax: "0",
        country: "co",
        lang: "es",
        external: "false",
        onpage: "true",
        test: process.env.NEXT_PUBLIC_EPAYCO_TEST === 'true',
        // Customer info
        name_billing: billingInfo.name,
        address_billing: `${billingInfo.address}, ${selectedCity}, ${selectedDept}`,
        type_doc_billing: "cc",
        mobile_phone_billing: billingInfo.phone,
        number_doc_billing: billingInfo.doc,
        email_billing: billingInfo.email,
        // Response URLs
        confirmation: `${window.location.origin}/api/pagos/confirmacion`,
        response: `${window.location.origin}/pagos/resultado`,
      }

      handler.open(data)
    } catch (err) {
      console.error(err)
      alert('Hubo un inconveniente al procesar tu pedido. Por favor, intenta de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0 && step !== 'thanks') {
    return (
      <>
        <TopBar />
        <Header />
        <FloatingSidebar />
        <main className="min-h-screen flex items-center justify-center bg-[#fafafa] py-20 px-4">
          <div className="max-w-md w-full text-center brutalist-thanks p-10">
            <div className="w-20 h-20 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h1 className="font-black text-2xl uppercase tracking-tighter text-black mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8 font-medium">Agrega algunos productos para continuar con el proceso de pago.</p>
            <Link href="/tienda" className="inline-block w-full py-4 px-8 font-black uppercase tracking-widest text-center brutalist-button">
              Ir a la Tienda
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Script 
        src="https://checkout.epayco.co/checkout.js" 
        strategy="afterInteractive"
      />
      <TopBar />
      <Header />
      <FloatingSidebar />
      <main className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-24 px-4 lg:px-8">
        <div className="container mx-auto">
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
              color: #fff !important;
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
            .brutalist-button-success {
              background-color: #10b981 !important;
              color: #000 !important;
              border: 3px solid #000 !important;
              box-shadow: 6px 6px 0 0 #000 !important;
              transition: all 0.2s ease !important;
            }
            .brutalist-button-success:hover {
              background-color: #059669 !important;
              box-shadow: none !important;
              transform: translate(4px, 4px) !important;
            }
            .brutalist-card {
              background-color: #ffffff !important;
              border: 2px solid #e5e7eb !important;
              box-shadow: none !important;
              transition: all 0.3s ease !important;
            }
            .brutalist-card:hover {
              border: 4px solid #000000 !important;
              box-shadow: 12px 12px 0px 0px #000000 !important;
              transform: translateY(-4px) !important;
              z-index: 10;
            }
            .brutalist-sidebar {
              background-color: #000000 !important;
              color: #ffffff !important;
              border: 4px solid #000000 !important;
              box-shadow: 12px 12px 0px 0px rgba(0,0,0,0.3) !important;
            }
            .brutalist-thanks {
              background-color: #ffffff !important;
              border: 4px solid #000000 !important;
              box-shadow: 12px 12px 0px 0px #000000 !important;
            }
          `}} />
          
          {/* Brutalist Progress Bar - Bulletproof layout */}
          <div className="mb-16 max-w-3xl mx-auto flex items-start justify-between relative">
            <div className="absolute top-5 md:top-6 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div className="absolute top-5 md:top-6 left-0 h-1 bg-black -z-10 transition-all duration-500" style={{ width: step === 'cart' ? '0%' : step === 'info' ? '33%' : step === 'payment' ? '66%' : '100%' }}></div>
            
            {[
              { id: 'cart', num: '1', label: 'Carrito' },
              { id: 'info', num: '2', label: 'Datos' },
              { id: 'payment', num: '3', label: 'Pago' },
              { id: 'thanks', num: '4', label: 'Fin' }
            ].map((s, i) => {
              const isActive = step === s.id;
              const isPast = ['cart', 'info', 'payment', 'thanks'].indexOf(step) > i;
              return (
                <div key={s.id} className="flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 border-2 border-black flex items-center justify-center font-black text-sm md:text-base transition-colors ${isActive || isPast ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {isPast ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span className={`font-bold text-[10px] md:text-xs uppercase tracking-widest ${isActive || isPast ? 'text-black' : 'text-gray-400'}`}>{s.label}</span>
                </div>
              )
            })}
          </div>

          <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-start ${step === 'thanks' ? 'justify-center' : ''}`}>
            
            {/* MAIN CONTENT AREA (Form/Cart items) */}
            <div className={`w-full ${step === 'thanks' ? 'max-w-3xl mx-auto' : 'lg:w-7/12 xl:w-2/3'} flex flex-col gap-8`}>
              
              {/* STEP 1: CART */}
              {step === 'cart' && (
                <div className="flex flex-col gap-6">
                  <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black border-b-4 border-black pb-4">Resumen del Carrito</h1>
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 brutalist-card relative">
                        <div className="w-full sm:w-24 h-24 bg-gray-50 border-2 border-black flex-shrink-0 p-2 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 text-center sm:text-left w-full">
                          <h3 className="font-black text-lg text-black uppercase leading-tight">{item.name}</h3>
                          {item.specs && <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{item.specs}</p>}
                          
                          <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                            <div className="flex items-center border-2 border-black bg-gray-50">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors">-</button>
                              <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-black transition-colors underline decoration-2 underline-offset-4">
                              Remover
                            </button>
                          </div>
                        </div>
                        <div className="font-black text-xl text-black shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => handleNextStep('info')} className="w-full py-5 font-black uppercase tracking-widest text-lg brutalist-button">
                    Continuar a Datos
                  </button>
                </div>
              )}

              {/* STEP 2: INFO */}
              {step === 'info' && (
                <div className="flex flex-col gap-6">
                  <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black border-b-4 border-black pb-4">Información de Facturación</h1>
                  <form className="flex flex-col gap-6 p-6 md:p-8 brutalist-card relative" onSubmit={e => { e.preventDefault(); handleNextStep('payment') }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Nombre Completo</label>
                        <input 
                          type="text" 
                          required 
                          value={billingInfo.name}
                          onChange={(e) => setBillingInfo({...billingInfo, name: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0 }} 
                          placeholder="Juan Pérez" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Documento (CC/NIT)</label>
                        <input 
                          type="text" 
                          required 
                          value={billingInfo.doc}
                          onChange={(e) => setBillingInfo({...billingInfo, doc: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0 }} 
                          placeholder="1234567890" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Correo Electrónico</label>
                        <input 
                          type="email" 
                          required 
                          value={billingInfo.email}
                          onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0 }} 
                          placeholder="correo@ejemplo.com" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Teléfono Celular</label>
                        <input 
                          type="tel" 
                          required 
                          value={billingInfo.phone}
                          onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0 }} 
                          placeholder="300 1234567" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block font-black text-xs uppercase tracking-widest text-black">Dirección de Envío</label>
                      <input 
                        type="text" 
                        required 
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                        style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0 }} 
                        placeholder="Calle 45 #32-15" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Departamento</label>
                        <select 
                          required 
                          value={selectedDept}
                          onChange={(e) => {
                            setSelectedDept(e.target.value);
                            setSelectedCity('');
                          }}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0, backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                        >
                          <option value="">Seleccionar Departamento</option>
                          {colombianDepartments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block font-black text-xs uppercase tracking-widest text-black">Ciudad</label>
                        <select 
                          required 
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          disabled={!selectedDept}
                          style={{ width: '100%', backgroundColor: '#f9fafb', border: '3px solid #000', padding: '16px', boxSizing: 'border-box', minHeight: '56px', fontSize: '16px', fontWeight: 500, outline: 'none', margin: 0, appearance: 'none', borderRadius: 0, opacity: !selectedDept ? 0.6 : 1, backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                        >
                          <option value="">{selectedDept ? 'Seleccionar Ciudad' : 'Primero elige departamento'}</option>
                          {selectedDept && citiesByDepartment[selectedDept]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                      <button type="button" onClick={() => handleNextStep('cart')} className="w-full sm:w-1/3 py-4 font-black uppercase tracking-widest text-center brutalist-button-secondary">
                        Volver
                      </button>
                      <button type="submit" className="w-full sm:w-2/3 py-4 font-black uppercase tracking-widest text-center brutalist-button">
                        Continuar al Pago
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 'payment' && (
                <div className="flex flex-col gap-6">
                  <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-black border-b-4 border-black pb-4">Pagar con Tarjeta</h1>
                  <div className="flex flex-col gap-8 p-6 md:p-8 brutalist-card relative">
                    
                    <div className="flex flex-col items-center gap-6 py-10 text-center">
                      <div className="w-20 h-20 bg-gray-100 border-4 border-black rounded-full flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-black text-2xl uppercase tracking-tighter">Pago Seguro con ePayco</h2>
                        <p className="text-gray-500 font-medium">Serás redirigido a la plataforma segura de ePayco para completar tu transacción.</p>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button type="button" onClick={() => handleNextStep('info')} className="w-full sm:w-1/3 py-4 font-black uppercase tracking-widest text-center brutalist-button-secondary">
                        Volver
                      </button>
                      <button 
                        type="button" 
                        disabled={isProcessing}
                        onClick={handleEpaycoPayment} 
                        className={`w-full sm:w-2/3 py-4 font-black uppercase tracking-widest text-center transition-all ${
                          isProcessing 
                            ? 'bg-gray-200 border-3 border-gray-400 text-gray-500 cursor-not-allowed shadow-none' 
                            : 'brutalist-button-success'
                        }`}
                      >
                        {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: THANKS */}
              {step === 'thanks' && (
                <div className="text-center brutalist-thanks p-8 md:p-12">
                  <div className="w-24 h-24 bg-[#10b981] border-4 border-black flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0_0_#000] transform -rotate-3">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tighter text-black mb-4">¡Orden Recibida!</h1>
                  <p className="text-lg font-medium text-gray-600 max-w-md mx-auto mb-8">Tu pedido ha sido procesado exitosamente y estamos preparándolo para el envío.</p>
                  
                  <div className="mb-8 text-left max-w-md mx-auto bg-gray-50 border-2 border-black p-6">
                    <div className="flex justify-between border-b-2 border-gray-200 pb-3 mb-3">
                      <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Orden No.</span>
                      <span className="font-black">#FT-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-gray-200 pb-3 mb-3">
                      <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Total</span>
                      <span className="font-black text-[#10b981]">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Pago</span>
                      <span className="font-black uppercase">Tarjeta Crédito</span>
                    </div>
                  </div>

                  <Link href="/" onClick={() => clearCart()} className="inline-block py-4 px-10 font-black uppercase tracking-widest text-center brutalist-button">
                    Volver al Inicio
                  </Link>
                </div>
              )}

            </div>

            {/* SIDEBAR ORDER SUMMARY */}
            {step !== 'thanks' && (
              <div className="w-full lg:w-5/12 xl:w-1/3">
                <div className="sticky top-24 p-6 md:p-8 brutalist-sidebar">
                  <h3 className="font-black text-xl uppercase tracking-widest border-b-2 border-white/20 pb-4 mb-6">Resumen del Pedido</h3>
                  
                  <div className="flex flex-col gap-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start text-base font-medium">
                        <span className="text-gray-300 pr-4 leading-tight">{item.quantity}x {item.name}</span>
                        <span className="font-black whitespace-nowrap pt-0.5">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-white/20 pt-6 flex flex-col gap-5">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                      <span className="font-black">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-400 font-bold uppercase tracking-widest">Envío</span>
                      <span className="font-black text-[#10b981] uppercase tracking-widest">Gratis</span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t-2 border-white/20 mt-2">
                      <span className="text-lg font-black uppercase tracking-widest text-white">Total</span>
                      <span className="text-3xl font-black text-[#10b981]">{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function PagosPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PagosContent />
    </Suspense>
  )
}
