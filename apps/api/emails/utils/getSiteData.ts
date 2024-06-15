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
    kunsthalte: 'https://www.kunsthalte.com/images/kunsthalte-logo.svg',
    'trend-rights':
      'https://www.trendrights.com/images/trend-rights-logo-light.svg',
  }

  return (
    siteLogos[site] ||
    'https://www.freedomcombination.com/images/foundation-logo.svg'
  )
}

export const getSiteColor = (site: Site) => {
  const siteColors = {
    kunsthalte: '#22b580',
    'trend-rights': '#FF4F00',
    dashboard: 'green',
  }

  return siteColors[site] || 'blue'
}

export const getSiteName = (site: Site) => {
  const siteNames = {
    kunsthalte: 'Kunsthalte',
    'trend-rights': 'Trend Rights',
    dashboard: 'Dashboard',
  }

  return siteNames[site] || 'Freedom Combination'
}
