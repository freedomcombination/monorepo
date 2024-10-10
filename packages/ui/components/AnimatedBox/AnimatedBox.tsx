import { ComponentProps, FC, PropsWithChildren, useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import { useAnimation, Transition, Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MotionBox = motion(Box)

type AnimatedBoxProps = PropsWithChildren<ComponentProps<typeof MotionBox>> & {
  directing?: 'to-down' | 'to-up' | 'to-left' | 'to-right'
  distance?: number
  hasHover?: boolean
  delay?: number
  duration?: number
  transition?: Transition
  variants?: Variants
}

export const AnimatedBox: FC<AnimatedBoxProps> = ({
  children,
  directing,
  distance = 50,
  hasHover = false,
  delay = 0,
  duration = 1,
  transition,
  variants,
  ...rest
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const initialVariants = {
    'to-up': {
      active: { opacity: 1, y: 0 },
      inactive: { opacity: 0, y: distance },
    },
    'to-down': {
      active: { opacity: 1, y: 0 },
      inactive: { opacity: 0, y: -distance },
    },
    'to-left': {
      active: { opacity: 1, x: 0 },
      inactive: { opacity: 0, x: distance },
    },
    'to-right': {
      active: { opacity: 1, x: 0 },
      inactive: { opacity: 0, x: -distance },
    },
  }

  useEffect(() => {
    if (inView) {
      controls.start('active')
    }
  }, [controls, inView])

  return (
    <MotionBox
      ref={ref}
      animate={controls}
      transition={
        transition || {
          duration: duration ?? 0.5,
          stiffness: 100,
          damping: 10,
          type: 'spring',
          delay: delay / 10,
        }
      }
      initial="inactive"
      w="full"
      {...(variants && { variants })}
      {...(directing && { variants: initialVariants[directing] })}
      {...rest}
    >
      <MotionBox
        {...(hasHover && {
          cursor: 'pointer',
          whileHover: { scale: 1.03 },
          whileTap: { scale: 1.01 },
        })}
        w="full"
        h="full"
      >
        {children}
      </MotionBox>
    </MotionBox>
  )
}
