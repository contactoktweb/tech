import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { invoice, status } = body

    if (!invoice || !status) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const token = process.env.SANITY_API_TOKEN

    if (!projectId || !dataset || !token) {
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
    }

    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion: '2026-05-17',
      token,
      useCdn: false,
    })

    // Query for the order document by invoice ref
    const query = `*[_type == "order" && invoice == $invoice][0]._id`
    const orderId = await writeClient.fetch(query, { invoice })

    if (orderId) {
      console.log(`📝 Actualizando estado del pedido ${invoice} (ID: ${orderId}) a: ${status} en /api/pedidos/actualizar`)
      await writeClient.patch(orderId).set({ status }).commit()
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      console.warn(`⚠️ No se encontró pedido en Sanity con factura: ${invoice}`)
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
    }
  } catch (error) {
    console.error('💥 Error actualizando pedido en Sanity:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
