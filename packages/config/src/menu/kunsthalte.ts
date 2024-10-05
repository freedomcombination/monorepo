import {
  about,
  arts,
  collections,
  contact,
  privacy,
  term,
  donation,
  activities,
} from './routes'
import { Menus } from './types'

export const kunsthalte: Menus = {
  headerMenu: [arts, collections, activities, about, contact],
  footerMenu: [
    {
      children: [
        contact,
        about,
        {
          link: 'https://freedomcombination.com',
          tr: 'Vakıf',
          en: 'Foundation',
          nl: 'Stichting',
        },
        donation,
      ],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [arts, collections, activities],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [term, privacy],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
}
