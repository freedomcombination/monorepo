import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { CourseApplication } from '@fc/types'

import { CourseContext } from './CourseContext'
import { CourseFaqs } from './CourseFaqs'
import { CourseInfo } from './CourseInfo'
import { CourseRegister } from './CourseRegister'
import { CourseDetailPageProps } from './types'
import { Container } from '../Container'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export const CourseDetailPage: FC<CourseDetailPageProps> = ({
  course,
  courses,
  source,
}) => {
  const { locale, asPath } = useRouter()
  const { isLoading, profile } = useAuthContext()
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

  const applications = data?.data || []
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
          */
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
      */
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

  const title = course[`title_${locale || 'nl'}`]
  const description = course[`description_${locale || 'nl'}`]
  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Container maxW={'6xl'}>
      <CourseContext.Provider
        value={{
          course,
          applications: data?.data || [],
          myApplication,
          paidApplications,
          isLoading: isLoading || isLoadingApplications,
          refetchApplicants: refetch,
        }}
      >
        <Stack spacing={12} pb={16} pt={4}>
          <Stack spacing={4}>
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

          <CourseRegister />

          <Stack spacing={4}>
            <Heading as={'h3'} size={'lg'}>
              {t('faq')}
            </Heading>
            <CourseFaqs />
          </Stack>

          {courses?.length > 0 && (
            <Stack spacing={4}>
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
