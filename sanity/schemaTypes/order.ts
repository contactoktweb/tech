import { defineField, defineType } from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Pedidos / Órdenes',
  type: 'document',
  fields: [
    defineField({
      name: 'invoice',
      title: 'Factura / Referencia',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado del Pedido',
      type: 'string',
      options: {
        list: [
          { title: 'Creado / Iniciado', value: 'creado' },
          { title: 'Pendiente de Pago', value: 'pendiente' },
          { title: 'Pagado / Exitoso', value: 'pagado' },
          { title: 'Fallido / Rechazado', value: 'fallido' },
        ],
      },
      initialValue: 'creado',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'total',
      title: 'Total de la Compra',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Correo Electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerDoc',
      title: 'Documento (CC/NIT)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Teléfono',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerAddress',
      title: 'Dirección de Envío',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerCity',
      title: 'Ciudad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerDepartment',
      title: 'Departamento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Productos Comprados',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'orderItem',
          title: 'Producto de la Orden',
          fields: [
            defineField({
              name: 'productId',
              title: 'ID del Producto',
              type: 'string',
            }),
            defineField({
              name: 'name',
              title: 'Nombre del Producto',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Precio Unitario',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quantity',
              title: 'Cantidad',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'specs',
              title: 'Variación / Especificaciones',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Fecha de Creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'invoice',
      subtitle: 'customerName',
      total: 'total',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, total, status } = selection
      const statusLabels: Record<string, string> = {
        creado: '🟢 CREADO',
        pendiente: '⏳ PENDIENTE',
        pagado: '✅ PAGADO',
        fallido: '❌ FALLIDO',
      }
      const formattedTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }).format(total || 0)
      return {
        title: `${title} - ${statusLabels[status] || status}`,
        subtitle: `${subtitle} | Total: ${formattedTotal}`,
      }
    },
  },
})
