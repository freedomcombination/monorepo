export const styles = {
  global: {
    'html, body, #__next': {
      h: 'full',
      fontFamily: 'body',
    },
    body: {
      color: 'gray.700',
      bg: 'gray.50',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    iframe: {
      border: 'none',
      width: '100%',
      height: '450px',
    },
    a: {
      bgGradient: 'linear(to-b, primary.400, primary.500)',
      bgClip: 'text',
      _hover: {
        textDecoration: 'none',
      },
    },
    '.grecaptcha-badge': {
      display: 'none',
    },
  },
}
