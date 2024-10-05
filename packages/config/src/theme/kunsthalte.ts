import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const kunsthalte = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.club,
      heading: `"firdevs", sans-serif;`,
    },
    colors: {
      primary: defaultTheme['colors'].teal,
    },
  }),
)
