import { NextSeoProps } from 'next-seo'

import { Site, Localize } from '@fc/types'

import { dashboard } from './dashboard'
import { foundation } from './foundation'
import { kunsthalte } from './kunsthalte'
import { lotus } from './lotus'
import { trendRights } from './trend-rights'

export const defaultSeo: Record<Site, Localize<NextSeoProps>> = {
  dashboard,
  lotus,
  kunsthalte,
  'trend-rights': trendRights,
  foundation,
}
