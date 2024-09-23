import { Button, ButtonGroup } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

import { useJoinFormContext } from './useJoinFormContext'

export const PaginationButtons = () => {
  const { activeStep, steps, handleNext, handlePrev } = useJoinFormContext()

  return (
    <ButtonGroup
      size={'sm'}
      overflowX={'auto'}
      justifyContent={'center'}
      spacing={4}
    >
      <Button
        isDisabled={activeStep == 0}
        leftIcon={<FaArrowLeft />}
        onClick={handlePrev}
      >
        Prev
      </Button>

      <Button
        isDisabled={activeStep === steps.length - 1}
        rightIcon={<FaArrowRight />}
        onClick={handleNext}
      >
        Next
      </Button>
    </ButtonGroup>
  )
}
