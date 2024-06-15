import { Site } from '@fc/types'

import { dashboard } from './dashboard'
import { foundation } from './foundation'
import { kunsthalte } from './kunsthalte'
import { lotus } from './lotus'
import { trendRights } from './trend-rights'

export { defaultTheme } from './theme'

export const themes: Record<Site, Record<string, any>> = {
  dashboard,
  kunsthalte,
  lotus,
  'trend-rights': trendRights,
  foundation,
}
