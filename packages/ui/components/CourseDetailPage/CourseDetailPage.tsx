import { FC, useMemo } from 'react'

import { Box, Heading, HStack, List, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  MdArrowForward,
  MdAttachFile,
  MdCheck,
  MdDone,
  MdTimer,
} from 'react-icons/md'

import { Alert } from '@fc/chakra'
import { SITE_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { CourseApplication } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'

import { CourseContext } from './CourseContext'
import { CourseFaqs } from './CourseFaqs'
import { CourseInfo } from './CourseInfo'
import { CourseRegister } from './CourseRegister'
import { CourseDetailPageProps } from './types'
import { Container } from '../Container'
import { CourseAssignmentFileButton } from '../CourseApplicationInstallment'
import { Markdown } from '../Markdown'
import { StripeResult } from '../ProfileSettings/Payment/StripeResult'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export const CourseDetailPage: FC<CourseDetailPageProps> = ({
  course,
  courses,
  source,
}) => {
  const { locale, asPath } = useRouter()
  const { loading, profile } = useAuthContext()
  const { t } = useTranslation()
  const {
    data,
    isLoading: isLoadingApplications,
    refetch,
  } = useStrapiRequest<CourseApplication>({
    endpoint: 'course-applications',
    filters: {
      course: { id: { $eq: course.id } },
    },
  })

  const applications = useMemo(() => data?.data || [], [data?.data])
  const courseLogic = useMemo(
    () => new CourseLogic(course, applications, profile),
    [course, applications, profile],
  )

  /*
  const myApplication = applications.find(
    application => application?.profile?.id === profile?.id,
  )
  const paidApplications = applications.filter(application => {
    // Step - 1
    // hasPaid : if user pay by hand
    if (application?.hasPaid) return true

    // Step - 2
    // payments : if user pay by stripe
    const payments = application?.payments || []
    if (payments.length > 0) {
      const anyValidPayment = payments.some(
        /*
           we don't care if the payment fully made, 
           only looking if there is any valid payment
           in case there is a installment...
          *
        payment => payment?.status === 'paid',
      )
      if (anyValidPayment) return true
    }

    // Step - 3
    /*
        there is another case,
        if user ask for installment and admin accept it
        so that means application.installmentCount bigger then 0
        but user has not paid any installment yet.
        if this case is valid un-comment the next line
      *
    // if (application.installmentCount && application.installmentCount > 0) return true

    // Step - 4
    // paymentExplanation : if user has an explanation
    if (
      application?.paymentExplanation && // user inform an explanation about the payment
      application?.approvalStatus !== 'rejected' // and has not been rejected by admin
      // this case can be end up with installment payment which ll be handled in step 2 or 3
    )
      return true

    return false
  })
  */

  const title = course[`title_${locale || 'nl'}`]
  const description = course[`description_${locale || 'nl'}`]
  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Container maxW={'6xl'}>
      <StripeResult reValidate={refetch} />
      <CourseContext.Provider
        value={{
          course,
          applications,
          courseLogic,
          isLoading: loading || isLoadingApplications,
          refetchApplicants: refetch,
        }}
      >
        <Stack gap={12} pb={16} pt={4}>
          <Stack gap={4}>
            <WImage ratio={16 / 9} src={course.image} alt="" />

            <Stack
              justify={'space-between'}
              flexDir={{ base: 'column', md: 'row' }}
            >
              <CourseInfo />

              <ShareButtons
                size={'md'}
                title={title}
                quote={description}
                url={URL}
              />
            </Stack>
          </Stack>

          <Heading as={'h1'} size={'2xl'} textAlign={'center'} py={8}>
            {title}
          </Heading>

          <Box>
            <Markdown source={source} />
          </Box>

          {course.requireApproval && (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              maxWidth={'3xl'}
              borderWidth={1}
              borderRadius={'md'}
              width="full"
              alignSelf={'center'}
              p={8}
              title={t('course.application.assignment.rules.title')}
            >
              <List.Root gap={3} mt={6} textAlign={'left'}>
                <List.Item>
                  <List.Indicator as={MdDone} color="green.500" />
                  {t('course.application.assignment.rules.line-1')}
                </List.Item>
                <List.Item>
                  <List.Indicator as={MdTimer} color="blue.500" />
                  {t('course.application.assignment.rules.line-2', {
                    days: course.assignmentSubmissionDeadline,
                  })}
                </List.Item>
                <List.Item>
                  <List.Indicator as={MdCheck} color="green.500" />
                  {t('course.application.assignment.rules.line-3', {
                    days: course.assignmentEvaluationTime,
                  })}
                </List.Item>
                <List.Item>
                  <List.Indicator as={MdArrowForward} color="blue.500" />
                  {t(
                    !!course.price
                      ? 'course.application.assignment.rules.line-4-price'
                      : 'course.application.assignment.rules.line-4',
                  )}
                </List.Item>
                <List.Item>
                  <HStack>
                    <List.Indicator as={MdAttachFile} color="blue.500" />
                    <Stack wrap={'wrap'} gap={2}>
                      {course.assignmentFiles?.map(file => (
                        <CourseAssignmentFileButton
                          key={file.name}
                          file={file}
                        />
                      ))}
                    </Stack>
                  </HStack>
                </List.Item>
              </List.Root>
            </Alert>
          )}

          <CourseRegister />

          {course.faqs && course.faqs?.length > 0 && (
            <Stack gap={4}>
              <Heading as={'h3'} size={'lg'}>
                {t('faq')}
              </Heading>
              <CourseFaqs />
            </Stack>
          )}

          {courses?.length > 0 && (
            <Stack gap={4}>
              <Heading as={'h3'} size={'lg'}>
                {t('course.other-courses')}
              </Heading>
              {/* TODO: Add courses grid */}
            </Stack>
          )}
        </Stack>
      </CourseContext.Provider>
    </Container>
  )
}
