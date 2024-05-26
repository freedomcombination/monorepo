import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { defaultTheme } from './theme'

export const dashboard = extendTheme(
  merge(defaultTheme, {
    styles: {
      global: {
        html: {
          overflow: 'hidden',
        },
      },
    },
    colors: {
      primary: defaultTheme['colors'].green,
    },
  }),
)
