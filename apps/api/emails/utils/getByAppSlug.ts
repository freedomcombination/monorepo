import { AppSlug, StrapiLocale } from '@fc/types'

/**
 * Returns the link based on the provided appSlug and locale.
 *
 * @param {AppSlug} appSlug - The slug of the application.
 * @param {StrapiLocale} [locale] - The locale to append to the link.
 * @returns {string} The generated link endwith a trailing slash.
 */
export const getLinkByAppSlug = (
  appSlug: AppSlug,
  locale?: StrapiLocale,
): string => {
  const appLinks = {
    kunsthalte: 'https://kunsthalte.com/',
    'trend-rights': 'https://www.trendrights.com/',
    dashboard: 'https://dashboard.freedomcombination.com/',
  }

  const link = appLinks[appSlug] || 'https://www.freedomcombination.com/'

  return locale ? `${link}${locale}/` : link
}

export const getLogoByAppSlug = (appSlug: AppSlug) => {
  const appLogos = {
    kunsthalte: 'https://www.kunsthalte.com/images/kunsthalte-logo.svg',
    'trend-rights':
      'https://www.trendrights.com/images/trend-rights-logo-light.svg',
  }

  return (
    appLogos[appSlug] ||
    'https://www.freedomcombination.com/images/foundation-logo.svg'
  )
}

export const getColorByAppSlug = (appSlug: AppSlug) => {
  const appColors = {
    kunsthalte: '#22b580',
    'trend-rights': '#FF4F00',
    dashboard: 'green',
  }

  return appColors[appSlug] || 'blue'
}

export const getNameByAppSlug = (appSlug: AppSlug) => {
  const appNames = {
    kunsthalte: 'Kunsthalte',
    'trend-rights': 'Trend Rights',
    dashboard: 'Dashboard',
  }

  return appNames[appSlug] || 'Freedom Combination'
}
