import { merge } from 'lodash'
import { extendTheme } from '@chakra-ui/theme-utils'

import { colors } from './colors'
import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const trendRights = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.body,
      heading: fonts.body,
    },
    colors: {
      primary: colors['trend-rights'],
    },
  }),
)
