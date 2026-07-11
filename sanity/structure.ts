import type {StructureResolver} from 'sanity/structure'
import { CogIcon, HomeIcon, BasketIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // Singleton para Configuración Global
      S.listItem()
        .title('Configuración Global')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      
      // Home Page Sections Singleton Group
      S.listItem()
        .title('Página de Inicio')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Secciones de Inicio')
            .items([
              S.listItem()
                .title('1. Hero')
                .child(
                  S.document()
                    .schemaType('homeHero')
                    .documentId('homeHero')
                ),
              S.listItem()
                .title('2. Conócenos (About)')
                .child(
                  S.document()
                    .schemaType('homeAbout')
                    .documentId('homeAbout')
                ),
              S.listItem()
                .title('3. Nuestro Portafolio')
                .child(
                  S.document()
                    .schemaType('homeCategories')
                    .documentId('homeCategories')
                ),
              S.listItem()
                .title('4. Garantía y Respaldo')
                .child(
                  S.document()
                    .schemaType('homeGuarantees')
                    .documentId('homeGuarantees')
                ),
              S.listItem()
                .title('5. Nuestros Servicios')
                .child(
                  S.document()
                    .schemaType('homeServices')
                    .documentId('homeServices')
                ),
              S.listItem()
                .title('6. Banner de Software')
                .child(
                  S.document()
                    .schemaType('homeSoftware')
                    .documentId('homeSoftware')
                ),
              S.listItem()
                .title('7. Banner B2B')
                .child(
                  S.document()
                    .schemaType('homeB2B')
                    .documentId('homeB2B')
                ),
              S.listItem()
                .title('8. Banner de Pagos')
                .child(
                  S.document()
                    .schemaType('homePayments')
                    .documentId('homePayments')
                ),
              S.listItem()
                .title('9. Distintivos de Confianza')
                .child(
                  S.document()
                    .schemaType('homeTrustBadges')
                    .documentId('homeTrustBadges')
                ),
            ])
        ),
      S.divider(),
      
      // Productos
      S.listItem()
        .title('Productos')
        .icon(BasketIcon)
        .schemaType('product')
        .child(S.documentTypeList('product').title('Todos los Productos')),

      // Filter settings, home singletons and product from auto list
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'settings', 
          'homeHero', 
          'homeAbout', 
          'homeCategories', 
          'homeGuarantees', 
          'homeServices', 
          'homeSoftware', 
          'homeB2B', 
          'homePayments', 
          'homeTrustBadges',
          'product'
        ].includes(listItem.getId() || '')
      ),
    ])
