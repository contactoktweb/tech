import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Página Nosotros (Fangan Tech)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      initialValue: 'Nosotros',
    }),
    defineField({
      name: 'historyTitle',
      title: 'Título de la sección Historia',
      type: 'string',
      initialValue: 'Nuestra Historia',
    }),
    defineField({
      name: 'introText',
      title: 'Texto Introductorio',
      type: 'text',
      description: 'La historia y visión que inspiró Fangan Tech.',
      initialValue: 'Fangan Tech fuera mucho más que una empresa que vende computadores, impresoras y cámaras. La visión que hemos construido juntos es que la tecnología sea una herramienta para la inclusión, inspirada en la historia de Daniel, pero sin que la empresa dependa únicamente del tema del autismo.\n\nCreo que esta misión y visión pueden darle una identidad sólida y con proyección internacional.',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Título de la Misión',
      type: 'string',
      initialValue: 'Misión',
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
      initialValue: 'En Fangan Tech desarrollamos e implementamos soluciones tecnológicas que impulsan la transformación digital de empresas, instituciones y comunidades. Creemos que la tecnología debe ser una herramienta para generar oportunidades, promover la inclusión y mejorar la calidad de vida de las personas, actuando siempre con innovación, compromiso y responsabilidad social.',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Título de la Visión',
      type: 'string',
      initialValue: 'Visión',
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
      initialValue: 'Ser una empresa líder en soluciones tecnológicas en Colombia y América, reconocida por combinar innovación, excelencia e impacto social. Aspiramos a demostrar que la tecnología puede derribar barreras, fortalecer organizaciones y construir un futuro más inclusivo para todas las personas.',
    }),
    defineField({
      name: 'purposeTitle',
      title: 'Título del Propósito',
      type: 'string',
      initialValue: 'Nuestro Propósito',
    }),
    defineField({
      name: 'purpose',
      title: 'Nuestro Propósito',
      type: 'string',
      initialValue: 'Transformar vidas a través de la tecnología.',
    }),
    defineField({
      name: 'slogans',
      title: 'Eslogan(es)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Tecnología que transforma vidas.',
        'Innovación con propósito.',
        'Technology with Purpose.',
        'Innovación sin barreras.',
        'Construyendo un futuro más inclusivo.'
      ],
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Título de la sección Valores',
      type: 'string',
      initialValue: 'Los valores de Fangan Tech',
    }),
    defineField({
      name: 'valuesSubtitle',
      title: 'Subtítulo de la sección Valores',
      type: 'text',
      initialValue: 'Principios que guían nuestro trabajo día a día y nos permiten ofrecer siempre lo mejor a nuestros clientes y comunidad.',
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Innovación',
        'Inclusión',
        'Integridad',
        'Excelencia',
        'Compromiso',
        'Responsabilidad social',
        'Trabajo en equipo',
        'Empatía'
      ],
    }),
    defineField({
      name: 'signaturePhrase',
      title: 'Frase que identifica a Fangan Tech',
      type: 'string',
      initialValue: '“La tecnología tiene sentido cuando mejora la vida de las personas.”',
    }),
    defineField({
      name: 'teamTitle',
      title: 'Título de la sección Equipo',
      type: 'string',
      initialValue: 'Nuestro Equipo',
    }),
    defineField({
      name: 'teamSubtitle',
      title: 'Subtítulo de la sección Equipo',
      type: 'text',
      initialValue: 'Conoce a las personas detrás de Fangan Tech, un equipo comprometido con la innovación y el impacto social.',
    }),
    defineField({
      name: 'team',
      title: 'Equipo (Personas)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'person',
          title: 'Persona',
          fields: [
            {
              name: 'name',
              title: 'Nombre',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Rol o Cargo',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Página Nosotros',
      }
    },
  },
})
