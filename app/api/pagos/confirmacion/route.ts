import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendAdminNotification, sendUserNotification } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    // 1. Obtener los datos enviados por ePayco
    const formData = await request.formData()
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    console.log('🔔 Webhook de ePayco recibido:', data.x_ref_payco)

    // 2. Validar la firma (Seguridad)
    // La firma se construye con: p_cust_id_cliente + p_key + x_ref_payco + x_transaction_id + x_amount + x_currency_code
    const p_cust_id_cliente = process.env.EPAYCO_CUSTOMER_ID
    const p_key = process.env.EPAYCO_P_KEY
    const x_ref_payco = data.x_ref_payco
    const x_transaction_id = data.x_transaction_id
    const x_amount = data.x_amount
    const x_currency_code = data.x_currency_code
    const x_signature = data.x_signature

    if (!p_key || !p_cust_id_cliente) {
      console.error('❌ Error: EPAYCO_P_KEY o CUSTOMER_ID no configurados en .env.local')
      return NextResponse.json({ error: 'Config error' }, { status: 500 })
    }

    const signatureToValidate = crypto
      .createHash('sha256')
      .update(`${p_cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`)
      .digest('hex')

    // 3. Comparar firmas
    if (signatureToValidate !== x_signature) {
      console.error('❌ Firma de ePayco inválida. Posible intento de fraude.')
      // Aunque la firma falle, ePayco recomienda responder 200 para evitar reintentos, 
      // pero nosotros logueamos el error internamente.
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // 4. Procesar según el estado del pago
    // x_cod_response: 1=Aceptada, 2=Rechazada, 3=Pendiente, 4=Fallida
    const responseCode = parseInt(data.x_cod_response)

    if (responseCode === 1) {
      console.log('✅ Pago ACEPTADO:', x_ref_payco)
      
      // Enviar notificaciones por correo
      await sendAdminNotification(data)
      
      if (data.x_customer_email) {
        await sendUserNotification(data.x_customer_email, data)
      }
      
      // AQUÍ: Lógica para marcar pedido como pagado en tu DB
    } else if (responseCode === 3) {
      console.log('⏳ Pago PENDIENTE:', x_ref_payco)
    } else {
      console.log('❌ Pago FALLIDO/RECHAZADO:', x_ref_payco)
    }

    // ePayco espera un OK para dejar de enviar el webhook
    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 })
  } catch (error) {
    console.error('💥 Error procesando Webhook de ePayco:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
