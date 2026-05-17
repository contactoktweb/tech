import { defineField, defineType } from 'sanity'

export const homeAboutType = defineType({
  name: 'homeAbout',
  title: 'Inicio - Conócenos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo de la Sección',
      type: 'string',
    }),
    defineField({
      name: 'centerImage',
      title: 'Imagen Central',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cards',
      title: 'Tarjetas de Características',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Tarjeta',
          fields: [
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
              name: 'iconType',
              title: 'Tipo de Icono',
              type: 'string',
              options: {
                list: [
                  { title: 'Infraestructura TI (Capas)', value: 'layers' },
                  { title: 'Seguridad Digital (Escudo)', value: 'shield' },
                  { title: 'Soporte Experto (Usuarios)', value: 'users' },
                  { title: 'Eficiencia Operativa (Reloj)', value: 'clock' },
                ],
              },
            }),
          ],
        },
      ],
    }),
  ],
})
