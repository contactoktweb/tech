import { defineField, defineType } from 'sanity'

export const homePaymentsType = defineType({
  name: 'homePayments',
  title: 'Inicio - Banner de Pagos',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Etiqueta / Badge',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Métodos de Pago',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paymentMethod',
          title: 'Método de Pago',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
            }),
            defineField({
              name: 'iconType',
              title: 'Tipo de Icono (Legacy)',
              type: 'string',
              options: {
                list: [
                  { title: 'Tarjeta / Crédito', value: 'card' },
                  { title: 'PSE', value: 'pse' },
                  { title: 'Nequi / Celular', value: 'phone' },
                  { title: 'Efectivo / Monedas', value: 'cash' },
                ],
              },
            }),
            defineField({
              name: 'iconSvg',
              title: 'Código SVG Personalizado (Opcional)',
              description: 'Pega el código SVG completo aquí para sobrescribir el icono por defecto. (Ej: <svg>...</svg>)',
              type: 'text',
            }),
          ],
        },
      ],
    }),
  ],
})
