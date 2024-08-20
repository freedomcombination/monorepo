import { FC, ReactNode } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react'
import { addMonths, format, isAfter } from 'date-fns'
import { isPast } from 'date-fns/isPast'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { CourseApplication } from '@fc/types'
import { LineText } from './utils/PaymentLine'
import { getCoursePaymentDetails } from './utils/getCoursePaymentDetails'
import { getGeneralStatus } from './utils/getGeneralStatus'

export const CoursesTab: FC = () => {
  const { profile } = useAuthContext()
  const { data } = useStrapiRequest<CourseApplication>({
    endpoint: 'course-applications',
    filters: {
      profile: { id: { $eq: profile?.id } },
    },
    queryOptions: {
      enabled: !!profile,
    },
  })

  const applications = data?.data || []

  return (
    <Stack>
      {applications.length > 0 ? (
        <Accordion allowMultiple={false} width={'100%'} maxWidth={'100%'}>
          {applications.map(application => (
            <ApplicationView key={application.id} application={application} />
          ))}
        </Accordion>
      ) : (
        <Center>
          <Link href="/courses">
            <Button colorScheme="primary" size="lg" variant={'outline'}>
              Goto Courses
            </Button>
          </Link>
        </Center>
      )}
    </Stack>
  )
}

type ApplicationViewProps = {
  application: CourseApplication
}

const ApplicationView: FC<ApplicationViewProps> = ({ application }) => {
  const { locale } = useRouter()
  // const { t } = useTranslation() // TODO add translations
  const course = application.course!

  const getProp = (ca: CourseApplication, prop: string) => {
    return course[`${prop}_${locale}` as keyof CourseApplication['course']]
  }

  return (
    <AccordionItem key={application.id} maxWidth={'100%'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={600}>{getProp(application, 'title')}</Text>
            <LineText title={'Status'} value={<Text>{getGeneralStatus(course, application)}</Text>} />
          </VStack>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pr={4} overflow={'auto'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <LineText
            title="Kurs sayfası"
            value={<Link href={`courses/${course.slug}`}>Sayfaya git.</Link>}
          />
          {getCoursePaymentDetails(course, application)}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}
