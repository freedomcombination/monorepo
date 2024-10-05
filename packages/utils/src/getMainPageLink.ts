import { ROUTES } from '@fc/config'
import { StrapiEndpoint } from '@fc/types'

export const getMainPageLink = (endpoint: StrapiEndpoint): string =>
  (ROUTES as any)[endpoint].link.replace('/', '')
