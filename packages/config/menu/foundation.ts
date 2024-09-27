import {
  anbi,
  about,
  academy,
  activities,
  artStop,
  blogs,
  club,
  contact,
  donation,
  dashboard,
  join,
  lotus,
  platforms,
  presentations,
  privacy,
  trendRights,
  term,
  music,
} from './routes'
import { Menus } from './types'

export const foundation: Menus = {
  headerMenu: [
    activities,
    {
      link: platforms?.link,
      en: platforms?.en,
      nl: platforms?.nl,
      tr: platforms?.tr,
      children: [trendRights, artStop, lotus, academy, music],
    },
    blogs,
    club,
    {
      link: '/',
      en: 'Foundation',
      nl: 'Stichting',
      tr: 'Vakıf',
      children: [anbi, about, contact, join, presentations],
    },
  ],
  footerMenu: [
    {
      children: [trendRights, artStop, lotus, academy, music],
      en: platforms?.en,
      nl: platforms?.nl,
      tr: platforms?.tr,
    },
    {
      children: [about, contact, join, anbi, dashboard],
      en: 'Foundation',
      nl: 'Stichting',
      tr: 'Vakıf',
    },
    {
      children: [club, activities, blogs, presentations],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [term, privacy, donation],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
}
