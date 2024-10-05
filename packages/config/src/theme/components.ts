import { StyleFunctionProps, theme } from '@chakra-ui/react'

export const components = {
  Heading: {
    baseStyle: (props: StyleFunctionProps) => {
      const colorScheme = props.colorScheme

      return {
        fontFamily: 'heading',
        bgGradient: `linear(to-b, ${colorScheme}.300, ${colorScheme}.500)`,
        bgClip: 'text',
        fontWeight: 700,
      }
    },
    defaultProps: {
      colorScheme: 'primary',
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
        const colorScheme = props.colorScheme

        return {
          ...theme.components.Button.variants?.solid(props),
          color: 'white',
          bgGradient: `linear(to-b, ${colorScheme}.300, ${colorScheme}.500)`,
          _hover: {
            bgGradient: `linear(to-b, ${colorScheme}.500, ${colorScheme}.400)`,
          },
          _active: {
            bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.600)`,
          },
        }
      },
      outline: (props: StyleFunctionProps) => {
        const colorScheme = props.colorScheme

        return {
          ...theme.components.Button.variants?.outline(props),
          borderColor: `${colorScheme}.500`,
          color: `${colorScheme}.500`,
          borderWidth: 1.5,
          _hover: {
            bg: 'blackAlpha.50',
          },
        }
      },
      link: (props: StyleFunctionProps) => {
        const colorScheme = props.colorScheme

        return {
          ...theme.components.Button.variants?.link(props),
          bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.500)`,
          bgClip: 'text',
        }
      },
    },
    defaultProps: {
      colorScheme: 'primary',
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
      const colorScheme = props.colorScheme

      return {
        ...theme.components.Button.variants?.solid(props),
        color: 'white',
        bgGradient: `linear(to-b, ${colorScheme}.400, ${colorScheme}.500)`,
      }
    },
    baseStyle: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    defaultProps: {
      colorScheme: 'gray',
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
