import { extendTheme } from '@chakra-ui/theme-utils'

import { colors } from './colors'
import { components } from './components'
import { fonts } from './fonts'
import { styles } from './global'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'fc',
}

export const defaultTheme = extendTheme({
  config,
  fonts,
  colors,
  components,
  styles,
  shadows: {
    outline: 'none',
  },
})
