import { defineField, defineType } from 'sanity'

export const homeTrustBadgesType = defineType({
  name: 'homeTrustBadges',
  title: 'Inicio - Distintivos de Confianza',
  type: 'document',
  fields: [
    defineField({
      name: 'badges',
      title: 'Distintivos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'badgeItem',
          title: 'Distintivo',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'string',
            }),
            defineField({
              name: 'iconType',
              title: 'Tipo de Icono',
              type: 'string',
              options: {
                list: [
                  { title: 'Autenticidad (Escudo / Check)', value: 'shield-check' },
                  { title: 'Calidad (Reloj / Check)', value: 'clock-check' },
                  { title: 'Soporte (Cajas / Red)', value: 'support' },
                  { title: 'Tiempos (Tarjeta / Camión)', value: 'delivery' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Sin título',
                subtitle: subtitle || 'Sin descripción',
              }
            }
          }
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Distintivos de Confianza',
        subtitle: '4 marcas de respaldo de la página de inicio',
      }
    }
  }
})
