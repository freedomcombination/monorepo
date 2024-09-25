import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { useJoinFormContext } from './useJoinFormContext'

export const PaginationButtons = () => {
  const { t } = useTranslation()
  const { activeStep, steps, handleNext, handlePrev } = useJoinFormContext()

  return (
    <ButtonGroup overflowX={'auto'} justifyContent={'center'}>
      <Button
        isDisabled={activeStep == 0}
        leftIcon={<FaChevronLeft />}
        onClick={handlePrev}
        iconSpacing={{ base: 0, md: 2 }}
      >
        <Box as="span" display={{ base: 'none', md: 'inline' }}>
          {t('prev')}
        </Box>
      </Button>

      <Button
        isDisabled={activeStep === steps.length - 1}
        rightIcon={<FaChevronRight />}
        onClick={handleNext}
        iconSpacing={{ base: 0, md: 2 }}
      >
        <Box as="span" display={{ base: 'none', md: 'inline' }}>
          {t('next')}
        </Box>
      </Button>
    </ButtonGroup>
  )
}
