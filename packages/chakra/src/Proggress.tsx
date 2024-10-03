import { forwardRef } from 'react'

import { Progress as ChakraProgress } from '@chakra-ui/react'
import { HiOutlineInformationCircle } from 'react-icons/hi'

import { IconButton } from './IconButton'
import { ToggleTip } from './ToggleTip'

export const ProgressBar = forwardRef<
  HTMLDivElement,
  ChakraProgress.TrackProps
>(function ProgressBar(props, ref) {
  return (
    <ChakraProgress.Track {...props} ref={ref}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
})

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText

export interface ProgressLabelProps extends ChakraProgress.LabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
  function ProgressLabel(props, ref) {
    const { children, info, ...rest } = props

    return (
      <ChakraProgress.Label {...rest} ref={ref}>
        {children}
        {info && (
          <ToggleTip content={info}>
            <IconButton
              variant="ghost"
              aria-label="info"
              size="xs"
              ms="1"
              icon={<HiOutlineInformationCircle />}
            />
          </ToggleTip>
        )}
      </ChakraProgress.Label>
    )
  },
)

export const Progress = (
  props: ChakraProgress.RootProps & { inDeterminate?: boolean },
) => {
  return (
    <ProgressRoot {...props}>
      <ProgressBar />
    </ProgressRoot>
  )
}
