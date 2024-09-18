import { FC } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

type PaginationButtonsProps = {
  activeStep: number
  steps: {
    description: string
    component: JSX.Element
    fields: string[]
  }[]
  handleNext: () => void
  handlePrev: () => void
}
export const PaginationButtons: FC<PaginationButtonsProps> = ({
  activeStep,
  steps,
  handleNext,
  handlePrev,
}) => {
  return (
    <ButtonGroup
      size={'sm'}
      overflowX={'auto'}
      justifyContent={'center'}
      spacing={4}
    >
      {activeStep > 0 && (
        <Button leftIcon={<FaArrowLeft />} onClick={handlePrev}>
          Prev
        </Button>
      )}
      {activeStep < steps?.length - 1 && (
        <Button rightIcon={<FaArrowRight />} onClick={handleNext}>
          Next
        </Button>
      )}
    </ButtonGroup>
  )
}
