import { FC } from 'react'

import { Badge, Box, Center, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { CourseApplication } from '@fc/types'

import { CoursePaymentDetails } from './Payment/components/CoursePaymentDetails'
import { PaymentLine } from './Payment/components/PaymentLine'
import { StripeResult } from './Payment/components/StripeResult'
import { GetGeneralStatus } from './Payment/utils/getGeneralStatus'

export const CoursesTab: FC = () => {
  const { profile } = useAuthContext()
  const { t } = useTranslation()
  const router = useRouter()
  const activeAccordionSlug = router.query.slug as string

  const { data, refetch } = useStrapiRequest<CourseApplication>({
    endpoint: 'course-applications',
    filters: {
      profile: { id: { $eq: profile?.id } },
    },
    populate: '*',
    queryOptions: {
      enabled: !!profile,
    },
  })

  const applications = data?.data || []

  const index = activeAccordionSlug
    ? applications.findIndex(a => a.course?.slug === activeAccordionSlug)
    : -1
  const extProps = index > -1 ? { index: [index] } : {}

  return (
    <Box>
      <StripeResult reValidate={refetch} />
      {applications.length > 0 ? (
        <Stack>
          <Accordion
            multiple={false}
            collapsible
            width={'100%'}
            maxWidth={'100%'}
            {...extProps}
          >
            {applications.map(application => (
              <ApplicationView key={application.id} application={application} />
            ))}
          </Accordion>
          <Link href="/courses">
            <Button colorPalette="primary" size="md" variant={'outline'}>
              {t('course.payment.title.check-other-courses')}
            </Button>
          </Link>
        </Stack>
      ) : (
        <Center>
          <Link href="/courses">
            <Button colorPalette="primary" size="lg" variant={'outline'}>
              {t('course.payment.title.go-to-courses')}
            </Button>
          </Link>
        </Center>
      )}
    </Box>
  )
}

type ApplicationViewProps = {
  application: CourseApplication
}

const ApplicationView: FC<ApplicationViewProps> = ({ application }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const course = application.course!

  const title = course[`title_${locale}` as keyof CourseApplication['course']]
  const status = GetGeneralStatus(course, application)

  return (
    <AccordionItem
      value="application-view"
      key={application.id}
      maxWidth={'100%'}
    >
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={600}>{title}</Text>
            <PaymentLine
              title={
                <Badge colorPalette={status.color} variant={'outline'}>
                  {t('status')}
                </Badge>
              }
            >
              <Text>{status.message}</Text>
            </PaymentLine>
          </VStack>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pr={4} overflow={'auto'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <PaymentLine title={t('course.payment.title.course-page')}>
            <Link href={`courses/${course.slug}`}>
              {t('course.payment.title.go-to-course')}
            </Link>
          </PaymentLine>
          <CoursePaymentDetails application={application} course={course} />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}
