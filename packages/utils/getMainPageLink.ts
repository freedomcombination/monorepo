import { ROUTES } from '@fc/config/data'
import type { StrapiEndpoint } from '@fc/types'

export const getMainPageLink = (endpoint: StrapiEndpoint): string =>
  (ROUTES as any)[endpoint].link.replace('/', '')
