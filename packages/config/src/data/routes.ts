import { MenuType } from '@fc/types'

type PlatformRouteKey =
  | 'lotus'
  | 'artStop'
  | 'music'
  | 'trend-rights'
  | 'academy'

type SiteRouteKey =
  | 'sign-up'
  | 'join'
  | 'club'
  | 'about'
  | 'contact'
  | 'donation'
  | 'dashboard'
  | 'foundation'
  | 'news'
  | 'tweets'

type EndpointRouteKey =
  | 'anbi'
  | 'activities'
  | 'announcements'
  | 'arts'
  | 'blogs'
  | 'collections'
  | 'hashtags'
  | 'platforms'
  | 'presentations'
  | 'privacy'
  | 'term'

export type RouteKey = EndpointRouteKey | SiteRouteKey | PlatformRouteKey

export const ROUTES: Record<RouteKey, MenuType> = {
  anbi: {
    link: '/anbi',
    en: 'ANBI',
    nl: 'ANBI',
    tr: 'ANBI',
  },
  arts: {
    link: '/club/arts',
    en: 'Arts',
    nl: 'Kunsten',
    tr: 'Eserler',
  },
  hashtags: {
    link: '/hashtags',
    en: 'Hashtags',
    nl: 'Hashtags',
    tr: 'Hashtagler',
  },
  collections: {
    link: '/club/collections',
    en: 'Collections',
    nl: 'Collecties',
    tr: 'Koleksiyonlar',
  },
  foundation: {
    link: 'https://freedomcombination.com',
    en: 'Foundation',
    nl: 'Stichting',
    tr: 'Vakıf',
  },
  platforms: {
    link: '/platforms',
    en: 'Platforms',
    nl: 'Platformen',
    tr: 'Platformlar',
  },
  activities: {
    link: '/activities',
    en: 'Activities',
    nl: 'Activiteiten',
    tr: 'Etkinlikler',
  },
  lotus: {
    link: '/platforms/lotus',
    en: 'Lotus van de Media',
    nl: 'Lotus van de Media',
    tr: 'Lotus van de Media',
  },
  artStop: {
    link: '/platforms/kunsthalte',
    en: 'Art Station',
    nl: 'Kunsthalte',
    tr: 'Sanat Durağı',
  },
  music: {
    link: '/platforms/rhythmic-dreams',
    en: 'Rhythmic Dreams',
    nl: 'Rhythmic Dreams',
    tr: 'Rhythmic Dreams',
  },
  'trend-rights': {
    link: '/platforms/trend-rights',
    en: 'Trend Rights',
    nl: 'Trend Rights',
    tr: 'Trend Rights',
  },
  academy: {
    link: '/platforms/academy',
    en: 'FC Academy',
    nl: 'FC Academie',
    tr: 'FC Akademi',
  },
  blogs: {
    link: '/blog',
    en: 'Blog',
    nl: 'Blog',
    tr: 'Blog',
  },
  announcements: {
    link: '/announcements',
    en: 'Announcements',
    nl: 'Aankondigingen',
    tr: 'Duyurular',
  },
  club: {
    link: '/club',
    en: 'Club',
    nl: 'Club',
    tr: 'Kulüp',
  },
  about: {
    link: '/about-us',
    en: 'About Us',
    nl: 'Over Ons',
    tr: 'Hakkımızda',
  },
  donation: {
    link: '/donation',
    en: 'Donation',
    nl: 'Donatie',
    tr: 'Bağış',
  },
  dashboard: {
    link: 'https://dashboard.freedomcombination.com',
    en: 'Dashboard',
    nl: 'Dashboard',
    tr: 'Kontrol Paneli',
  },
  term: {
    link: '/terms',
    en: 'Terms of service',
    nl: 'Algemene Voorwaarden ',
    tr: 'Kullanım Şartları',
  },
  privacy: {
    link: '/privacy',
    en: 'Privacy Policy',
    nl: 'Privacybeleid',
    tr: 'Gizlilik Politikası',
  },
  presentations: {
    link: '/presentations',
    en: 'Presentations',
    nl: 'Presentaties',
    tr: 'Sunumlar',
  },
  contact: {
    link: '/contact',
    en: 'Contact',
    nl: 'Contact',
    tr: 'İletişim',
  },
  'sign-up': {
    link: '/sign-up',
    en: 'Sign-Up',
    nl: 'Aanmelden',
    tr: 'Kayıt ol',
  },
  join: {
    link: '/join',
    en: 'Become a Volunteer',
    nl: 'Word Vrijwilliger',
    tr: 'Gönüllü Ol',
  },
  news: {
    link: '/news',
    en: 'News',
    nl: 'Nieuws',
    tr: 'Haberler',
  },
  tweets: {
    link: '/tweets',
    en: 'Tweets',
    nl: 'Tweets',
    tr: 'Tweets',
  },
}
