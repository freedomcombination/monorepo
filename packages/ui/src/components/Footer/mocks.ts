import { ROUTES } from '@fc/config'

const {
  activities,
  platforms,
  lotus,
  artStop,
  'trend-rights': trendRights,
  academy,
  club,
  about,
  contact,
  term,
  privacy,
} = ROUTES

export const FOOTER_MENU = [
  {
    children: [lotus, artStop, trendRights, academy],
    en: platforms.en,
    nl: platforms.nl,
    tr: platforms.tr,
  },
  {
    children: [about, contact],
    en: 'Foundation',
    nl: 'Stichting',
    tr: 'Vakıf',
  },
  {
    children: [club, activities],
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
]
