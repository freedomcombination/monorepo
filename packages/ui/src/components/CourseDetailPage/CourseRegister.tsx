import {
  Box,
  Center,
  Heading,
  Spinner,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { isPast } from 'date-fns/isPast'
import { useTranslation } from 'next-i18next'

import { Alert } from '@fc/chakra'
import { ALLOW_COURSE_PAYMENT } from '@fc/config'
import { useAuthContext } from '@fc/context'

import { CourseApplicationForm } from './CourseApplicationForm'
import { CourseApplicationPayForm } from './CourseApplicationPayForm'
import { useCourseContext } from './useCourseContext'
import { ProfileMenu } from '../Header/ProfileMenu'

export const CourseRegister = () => {
  const { isLoading, myApplication, course } = useCourseContext()
  const { user, profile } = useAuthContext()
  const { t } = useTranslation()

  const courseLastRegisterDate = course.lastRegisterDate

  const style: StackProps = {
    maxW: '3xl',
    w: 'full',
    alignSelf: 'center',
    minH: '200px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 7,
    p: 8,
    borderWidth: 1,
    rounded: 'md',
  }

  if (courseLastRegisterDate) {
    const isRegisterPast = isPast(courseLastRegisterDate)
    if (isRegisterPast) {
      return (
        <Alert
          title={t('course.application-closed')}
          status={'info'}
          variant="subtle"
          {...style}
        >
          <Box maxWidth="sm">{t('course.application-closed-description')}</Box>
          {myApplication && (
            <Box maxWidth="sm">{t('course.application-registered')}</Box>
          )}
        </Alert>
      )
    }
  }

  // show spinner while loading
  if (isLoading) {
    return (
      <Center {...style}>
        <Spinner size={'xl'} />
      </Center>
    )
  }

  // show login alert if user is not logged in
  if (!user || !profile) {
    return (
      <Alert status={'info'} variant="subtle" {...style}>
        <ProfileMenu />
        <Box maxWidth="sm">{t('course.application-login-to-continue')}</Box>
      </Alert>
    )
  }

  // show application form if user haven't applied yet
  if (!myApplication) {
    return (
      <Stack bg={'white'} {...style}>
        <Heading as={'h3'} size={'lg'}>
          {t('course.application-title')}
        </Heading>
        <CourseApplicationForm />
      </Stack>
    )
  }

  if (ALLOW_COURSE_PAYMENT) {
    // show payment form if user has already applied and not paid yet
    if (
      course.price &&
      !myApplication.hasPaid &&
      !myApplication.paymentExplanation &&
      !myApplication.payments?.some(payment => payment?.status === 'paid')
    ) {
      return (
        <Stack bg={'white'} {...style}>
          <Heading as={'h3'} size={'lg'}>
            {t('course.application-pay-title')}
          </Heading>
          <Text w={'100%'} px={20} textAlign={'center'}>
            {t('course.application.pay-description')}
          </Text>
          <CourseApplicationPayForm />
        </Stack>
      )
    }
  }

  return (
    <Alert
      title={t('course.payment.title.thanks')}
      status={'success'}
      variant="subtle"
      {...style}
    >
      <Box maxWidth="sm">{t('course.payment.message.thanks')}</Box>
    </Alert>
  )
}
