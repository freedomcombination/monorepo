import { extendTheme } from '@chakra-ui/theme-utils'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const lotus = extendTheme(
  merge(defaultTheme, {
    config: {
      initialColorMode: 'dark',
    },
    fonts: {
      body: fonts.body,
      heading: fonts.body,
    },
    colors: {
      primary: defaultTheme['colors'].lotus,
    },
  }),
)
