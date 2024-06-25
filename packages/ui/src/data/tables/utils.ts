import { StrapiLocale } from '@fc/types'

export const paidBadgesPDF = (hasPaid: boolean | null) => {
  return hasPaid ? 'Paid' : 'Not Yet'
}

export const localeBadgesPDF = (locales: StrapiLocale[]) => {
  return locales.map(locale => `[${locale}]`).join(', ')
}

export const publicationBadgePDF = (publishedAt: string | null) => {
  return publishedAt ? 'Published' : 'Draft'
}
