import { defineField, defineType } from 'sanity'

export const homeServicesType = defineType({
  name: 'homeServices',
  title: 'Inicio - Nuestros Servicios',
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
      name: 'categories',
      title: 'Categorías de Servicios',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceCategory',
          title: 'Categoría de Servicio',
          fields: [
            defineField({
              name: 'categoryName',
              title: 'Nombre de la Categoría',
              type: 'string',
            }),
            defineField({
              name: 'services',
              title: 'Lista de Servicios',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'serviceItem',
                  title: 'Servicio',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Título del Servicio',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Descripción del Servicio',
                      type: 'text',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'hrConsultingTitle',
      title: 'Título de Consultoría en RRHH',
      type: 'string',
      initialValue: 'Consultoría en RRHH',
    }),
    defineField({
      name: 'hrConsultingDescription',
      title: 'Descripción de Consultoría en RRHH',
      type: 'text',
      initialValue: 'Nuestra línea de consultoría en Recursos Humanos está diseñada para potenciar el talento de tu organización, abarcando desde la atracción de los mejores perfiles hasta su desarrollo y bienestar integral.',
    }),
    defineField({
      name: 'hrConsultingFeatures',
      title: 'Características de Consultoría en RRHH',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Selección y Reclutamiento',
        'Bienestar Organizacional',
        'Capacitación y Formación',
        'Desarrollo de Talento'
      ],
    }),
  ],
})
