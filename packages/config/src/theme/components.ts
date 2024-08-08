import { theme } from '@chakra-ui/theme'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

export const components = {
  Heading: {
    baseStyle: (props: StyleFunctionProps) => {
      const colorPalette = props.colorPalette

      return {
        fontFamily: 'heading',
        bgGradient: `linear(to-b, ${colorPalette}.300, ${colorPalette}.500)`,
        bgClip: 'text',
        fontWeight: 700,
      }
    },
    defaultProps: {
      colorPalette: 'primary',
    },
  },
  Button: {
    baseStyle: () => {
      return {
        fontWeight: 500,
      }
    },
    variants: {
      solid: (props: StyleFunctionProps) => {
        const colorPalette = props.colorPalette

        return {
          ...theme.components.Button.variants?.solid(props),
          color: 'white',
          bgGradient: `linear(to-b, ${colorPalette}.300, ${colorPalette}.500)`,
          _hover: {
            bgGradient: `linear(to-b, ${colorPalette}.500, ${colorPalette}.400)`,
          },
          _active: {
            bgGradient: `linear(to-b, ${colorPalette}.400, ${colorPalette}.600)`,
          },
        }
      },
      outline: (props: StyleFunctionProps) => {
        const colorPalette = props.colorPalette

        return {
          ...theme.components.Button.variants?.outline(props),
          borderColor: `${colorPalette}.500`,
          color: `${colorPalette}.500`,
          borderWidth: 1.5,
          _hover: {
            bg: 'blackAlpha.50',
          },
        }
      },
      link: (props: StyleFunctionProps) => {
        const colorPalette = props.colorPalette

        return {
          ...theme.components.Button.variants?.link(props),
          bgGradient: `linear(to-b, ${colorPalette}.400, ${colorPalette}.500)`,
          bgClip: 'text',
        }
      },
    },
    defaultProps: {
      colorPalette: 'primary',
    },
  },
  Tag: {
    variants: {
      outline: () => ({
        boxShadow: '0 0 0 1px primary.500',
      }),
    },
  },
  Badge: {
    solid: (props: StyleFunctionProps) => {
      const colorPalette = props.colorPalette

      return {
        ...theme.components.Button.variants?.solid(props),
        color: 'white',
        bgGradient: `linear(to-b, ${colorPalette}.400, ${colorPalette}.500)`,
      }
    },
    baseStyle: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    defaultProps: {
      colorPalette: 'gray',
    },
  },
  Link: {
    baseStyle: {
      _hover: {
        textDecor: 'none',
      },
      textDecor: 'none',
    },
  },
}
