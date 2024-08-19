import { Progress as ChakraProgress } from '@chakra-ui/react'
import { HiOutlineInformationCircle } from 'react-icons/hi'

import { IconButton } from './IconButton'
import { ToggleTip } from './ToggleTip'

export const ProgressBar = (props: ChakraProgress.TrackProps) => {
  return (
    <ChakraProgress.Track {...props}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
}

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText

export interface ProgressLabelProps extends ChakraProgress.LabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const { children, info, ...rest } = props

  return (
    <ChakraProgress.Label {...rest}>
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
}

export const Progress = (
  props: ChakraProgress.RootProps & { inDeterminate?: boolean },
) => {
  return (
    <ProgressRoot {...props}>
      <ProgressBar />
    </ProgressRoot>
  )
}
