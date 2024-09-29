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
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context/auth'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { CourseApplication } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'

import { ProfileCourseDetails } from './Payment/components/ProfileCourseDetails'
import { StripeResult } from './Payment/components/StripeResult'
import { I18nNamespaces } from '../../@types/i18next'
import { KeyValue } from '../KeyValueView'

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
    populate: [
      'course',
      'course.assignmentFiles',
      'profile',
      'submittedAssignmentFiles',
    ],
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
            allowMultiple={false}
            allowToggle
            width={'100%'}
            maxWidth={'100%'}
            {...extProps}
          >
            {applications.map(application => (
              <ApplicationView
                key={application.id}
                application={application}
                onSave={refetch}
              />
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
  onSave: () => void
}

const ApplicationView: FC<ApplicationViewProps> = ({ application, onSave }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const course = application.course!
  const { profile } = useAuthContext()
  const courseLogic = new CourseLogic(course, [application], profile)

  const title = course[`title_${locale}` as keyof CourseApplication['course']]
  const status = courseLogic.getMessage(locale)
  if (status.obj && 'msg' in status.obj) {
    status.obj.msg = t(status.obj.msg as keyof I18nNamespaces['common'])
  }

  return (
    <AccordionItem key={application.id} maxWidth={'100%'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={600}>{title}</Text>
            <KeyValue
              title={
                <Badge colorScheme={status.color} variant={'outline'}>
                  {t('status')}
                </Badge>
              }
              divider={false}
            >
              <Text>{t(status.message, status.obj)}</Text>
            </KeyValue>
          </VStack>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pr={4} overflow={'auto'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <KeyValue tKey={'course.payment.title.course-page'}>
            <Link href={`courses/${course.slug}`}>
              {t('course.payment.title.go-to-course')}
            </Link>
          </KeyValue>
          <ProfileCourseDetails courseLogic={courseLogic} onSave={onSave} />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}
