import { ROUTES } from '@fc/config/data'

const {
  activities,
  platforms,
  lotus,
  kunsthalte,
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
    children: [lotus, kunsthalte, trendRights, academy],
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
