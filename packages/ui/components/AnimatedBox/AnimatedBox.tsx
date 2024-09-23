import { FC, PropsWithChildren } from 'react'

import { Box, BoxProps } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'

type AnimatedBoxProps = PropsWithChildren<BoxProps> & {
  directing?: 'to-down' | 'to-up' | 'to-left' | 'to-right'
  distance?: number
  hasHover?: boolean
  delay?: number
  duration?: number
}

export const AnimatedBox: FC<AnimatedBoxProps> = ({
  children,
  hasHover = false,
}) => {
  const [ref] = useInView()

  return (
    <Box ref={ref} w="full">
      <Box
        {...(hasHover && {
          cursor: 'pointer',
          whileHover: { scale: 1.03 },
          whileTap: { scale: 1.01 },
        })}
        w="full"
        h="full"
      >
        {children}
      </Box>
    </Box>
  )
}
