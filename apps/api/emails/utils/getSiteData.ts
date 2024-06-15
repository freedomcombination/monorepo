import { Site, StrapiLocale } from '@fc/types'

/**
 * Returns the link based on the provided site and locale.
 *
 * @param {Site} site - The slug of the application.
 * @param {StrapiLocale} [locale] - The locale to append to the link.
 * @returns {string} The generated link endwith a trailing slash.
 */
export const getSiteLink = (site: Site, locale?: StrapiLocale): string => {
  const siteLinks = {
    kunsthalte: 'https://kunsthalte.com/',
    'trend-rights': 'https://www.trendrights.com/',
    dashboard: 'https://dashboard.freedomcombination.com/',
  }

  const link = siteLinks[site] || 'https://www.freedomcombination.com/'

  return locale ? `${link}${locale}/` : link
}

export const getSiteLogo = (site: Site) => {
  const siteLogos = {
    kunsthalte: 'https://www.kunsthalte.com/images/logo.png',
    'trend-rights': 'https://www.trendrights.com/images/logo.png',
  }

  return siteLogos[site] || 'https://www.freedomcombination.com/images/logo.png'
}

export const getSiteColor = (site: Site) => {
  const siteColors = {
    kunsthalte: '#319795',
    'trend-rights': '#FF4F00',
    dashboard: '#3182CE',
  }

  return siteColors[site] || '#3182CE'
}

export const getSiteName = (site: Site) => {
  const siteNames = {
    kunsthalte: 'Kunsthalte',
    'trend-rights': 'Trend Rights',
    dashboard: 'Dashboard',
  }

  return siteNames[site] || 'Freedom Combination'
}
