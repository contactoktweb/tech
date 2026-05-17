import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { invoice, total, customer, items } = body

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const token = process.env.SANITY_API_TOKEN

    if (!projectId || !dataset || !token) {
      console.error('❌ Error: Faltan credenciales de Sanity en .env.local para escribir pedidos')
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
    }

    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion: '2026-05-17',
      token,
      useCdn: false,
    })

    const orderDoc = {
      _type: 'order',
      invoice,
      status: 'creado',
      total: Number(total),
      customerName: customer.name,
      customerEmail: customer.email,
      customerDoc: customer.doc,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      customerCity: customer.city,
      customerDepartment: customer.department,
      items: items.map((item: any, idx: number) => ({
        _type: 'orderItem',
        _key: `item-${idx}-${Date.now()}`,
        productId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        specs: item.specs || '',
      })),
      createdAt: new Date().toISOString(),
    }

    console.log(`📝 Creando pedido en Sanity con ref: ${invoice}`)
    const created = await writeClient.create(orderDoc)
    console.log(`✅ Pedido creado exitosamente con ID: ${created._id}`)

    return NextResponse.json({ success: true, orderId: created._id }, { status: 200 })
  } catch (error) {
    console.error('💥 Error creando pedido en Sanity:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
