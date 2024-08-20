import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { CourseApplication } from '@fc/types'
import { useTranslation } from 'next-i18next'
import { CoursePaymentDetails } from './Payment/components/CoursePaymentDetails'
import { LineText } from './Payment/components/PaymentLine'
import { GetGeneralStatus } from './Payment/utils/getGeneralStatus'

export const CoursesTab: FC = () => {
  const { profile } = useAuthContext()
  const { t } = useTranslation()

  const { data } = useStrapiRequest<CourseApplication>({
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

  return (
    <Box>
      {applications.length > 0 ? (
        <Stack>
          <Accordion allowMultiple={false} width={'100%'} maxWidth={'100%'}>
            {applications.map(application => (
              <ApplicationView key={application.id} application={application} />
            ))}
          </Accordion>
          <Link href="/courses">
            <Button colorScheme="primary" size="md" variant={'outline'}>
              {t('course.payment.title.check-other-courses')}
            </Button>
          </Link>
        </Stack>
      ) : (
        <Center>
          <Link href="/courses">
            <Button colorScheme="primary" size="lg" variant={'outline'}>
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

  const getProp = (ca: CourseApplication, prop: string) => {
    return course[`${prop}_${locale}` as keyof CourseApplication['course']]
  }

  const status = GetGeneralStatus(course, application)

  return (
    <AccordionItem key={application.id} maxWidth={'100%'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={600}>{getProp(application, 'title')}</Text>
            <LineText
              title={
                <Badge colorScheme={status.color} variant={'outline'}>
                  {t('status')}
                </Badge>
              }
              value={<Text>{status.message}</Text>}
            />
          </VStack>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pr={4} overflow={'auto'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <LineText
            title={t('course.payment.title.course-page')}
            value={
              <Link href={`courses/${course.slug}`}>
                {t('course.payment.title.go-to-course')}
              </Link>
            }
          />
          <CoursePaymentDetails application={application} course={course} />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}
