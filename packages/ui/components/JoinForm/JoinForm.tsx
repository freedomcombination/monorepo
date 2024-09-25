import { Box, Button, Heading, HStack, Link, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaRegFilePdf } from 'react-icons/fa6'

import { PaginationButtons } from './PaginationButtons'
import Steps from './Steps'
import { useJoinFormContext } from './useJoinFormContext'

const JoinForm = () => {
  const { steps, activeStep } = useJoinFormContext()
  const { t } = useTranslation()

  return (
    <Stack gap={4} width={'100%'}>
      <HStack justify={'space-between'}>
        <Link
          lineHeight={1}
          href="/fc-vrijwilligersovereenkomst.pdf"
          download
          fontWeight={500}
          _hover={{ textDecoration: 'underline', color: 'primary.500' }}
        >
          <Button colorScheme="purple" leftIcon={<FaRegFilePdf />}>
            {t('download-volunteer-form')}
          </Button>
        </Link>

        <PaginationButtons />
      </HStack>
      <Stack
        align={'center'}
        p={{ base: 4, md: 6, lg: 8 }}
        gap={{ base: 4, md: 6 }}
        bg="white"
        rounded="lg"
        shadow="base"
      >
        <Box w="full" overflowX="auto" whiteSpace="nowrap">
          <Steps />
        </Box>
      </Stack>
      <Stack
        p={{ base: 4, md: 6, lg: 8 }}
        gap={{ base: 4, md: 6 }}
        bg="white"
        rounded="lg"
        shadow="base"
      >
        <Heading size="lg" as="h3" fontWeight={900}>
          {steps[activeStep]?.title}
        </Heading>
        {steps[activeStep]?.component}
      </Stack>
    </Stack>
  )
}

export default JoinForm
