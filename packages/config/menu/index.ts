import type { Site } from '@fc/types'

import { foundation } from './foundation'
import { kunsthalte } from './kunsthalte'
import { trendRights } from './trend-rights'
import { Menus } from './types'

export const menus: Record<Site, Menus> = {
  kunsthalte,
  'trend-rights': trendRights,
  foundation,
  dashboard: { headerMenu: [], footerMenu: [] },
  lotus: { headerMenu: [], footerMenu: [] },
}
