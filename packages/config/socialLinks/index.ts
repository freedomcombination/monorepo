import type { Site } from '@fc/types'

import { foundation } from './foundation'
import { kunsthalte } from './kunsthalte'
import { trendRights } from './trend-rights'
import { SocialLink } from './types'

export const socialLinks: Record<Site, SocialLink[]> = {
  foundation,
  'trend-rights': trendRights,
  kunsthalte,
  dashboard: [],
  lotus: [],
}
