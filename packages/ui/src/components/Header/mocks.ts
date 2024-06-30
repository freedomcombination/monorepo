import { ROUTES } from '@fc/config'

import { HeaderNavProps } from './types'

const {
  activities,
  platforms,
  lotus,
  artStop,
  'trend-rights': trendRights,
  academy,
  blogs,
  club,
  about,
  contact,
} = ROUTES

export const HEADER_MENU: Pick<HeaderNavProps, 'menu'>['menu'] = [
  activities,
  {
    link: platforms.link,
    en: platforms.en,
    nl: platforms.nl,
    tr: platforms.tr,
    children: [lotus, artStop, trendRights, academy],
  },
  blogs,
  club,
  {
    link: '/',
    en: 'Freedom Combination',
    nl: 'Freedom Combination',
    tr: 'Freedom Combination',
    children: [about, contact],
  },
]
