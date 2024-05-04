import {
  announcements,
  about,
  contact,
  foundation,
  hashtags,
  privacy,
  term,
  news,
  tweets,
} from './routes'
import { Menus } from './types'

export const trendRights: Menus = {
  headerMenu: [announcements, hashtags, about, contact, foundation],
  footerMenu: [
    {
      children: [foundation, about, contact],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [hashtags],
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

export const trendRightsWithProfile: Menus = {
  headerMenu: [news, tweets, ...trendRights.headerMenu],
  footerMenu: [
    {
      ...trendRights.footerMenu[0],
      children: [news, tweets, ...(trendRights.footerMenu[0].children || [])],
    },
    ...trendRights.footerMenu.slice(1),
  ],
}
