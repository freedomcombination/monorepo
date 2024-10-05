import { extendTheme } from '@chakra-ui/react'
import { merge } from 'lodash'

import { fonts } from './fonts'
import { defaultTheme } from './theme'

export const foundation = extendTheme(
  merge(defaultTheme, {
    fonts: {
      body: fonts.body,
      heading: fonts.body,
    },
    colors: {
      primary: defaultTheme['colors'].blue,
    },
  }),
)
