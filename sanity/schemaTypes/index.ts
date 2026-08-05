import { type SchemaTypeDefinition } from 'sanity'
import { settingsType } from './settings'
import { homeHeroType } from './homeHero'
import { homeAboutType } from './homeAbout'
import { homeCategoriesType } from './homeCategories'
import { homeGuaranteesType } from './homeGuarantees'
import { homeServicesType } from './homeServices'
import { homeSoftwareType } from './homeSoftware'
import { homeB2BType } from './homeB2B'
import { homePaymentsType } from './homePayments'
import { homeTrustBadgesType } from './homeTrustBadges'
import { productType } from './product'
import { categoryType } from './category'
import { brandType } from './brand'
import { orderType } from './order'
import { aboutPageType } from './aboutPage'
import { clientType } from './client'
import { portfolioType } from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    homeHeroType,
    homeAboutType,
    homeCategoriesType,
    homeGuaranteesType,
    homeServicesType,
    homeSoftwareType,
    homeB2BType,
    homePaymentsType,
    homeTrustBadgesType,
    productType,
    categoryType,
    brandType,
    orderType,
    aboutPageType,
    clientType,
    portfolioType,
  ],
}
