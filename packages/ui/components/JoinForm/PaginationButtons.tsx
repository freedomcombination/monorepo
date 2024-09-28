import { Box, Group } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Button } from '@fc/chakra'

import { useJoinFormContext } from './useJoinFormContext'

export const PaginationButtons = () => {
  const { t } = useTranslation()
  const { activeStep, steps, handleNext, handlePrev } = useJoinFormContext()

  return (
    <Group overflowX={'auto'} justifyContent={'center'} flexShrink={0}>
      <Button
        disabled={activeStep == 0}
        leftIcon={<FaChevronLeft />}
        onClick={handlePrev}
      >
        <Box as="span" display={{ base: 'none', md: 'inline' }}>
          {t('prev')}
        </Box>
      </Button>

      <Button
        disabled={activeStep === steps.length - 1}
        rightIcon={<FaChevronRight />}
        onClick={handleNext}
      >
        <Box as="span" display={{ base: 'none', md: 'inline' }}>
          {t('next')}
        </Box>
      </Button>
    </Group>
  )
}
