import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Heading,
  Spinner,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { isPast } from 'date-fns/isPast'
import { useTranslation } from 'next-i18next'

import { ALLOW_COURSE_PAYMENT } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'

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
        <Alert status={'info'} variant="subtle" {...style}>
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle>{t('course.application-closed')}</AlertTitle>
          <AlertDescription maxWidth="sm">
            {t('course.application-closed-description')}
          </AlertDescription>
          {myApplication && (
            <AlertDescription maxWidth="sm">
              {t('course.application-registered')}
            </AlertDescription>
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
        <AlertIcon boxSize="40px" mr={0} />
        <ProfileMenu />
        <AlertDescription maxWidth="sm">
          {t('course.application-login-to-continue')}
        </AlertDescription>
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
    <Alert status={'success'} variant="subtle" {...style}>
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle>{t('course.payment.title.thanks')}</AlertTitle>
      <AlertDescription maxWidth="sm">
        {t('course.payment.message.thanks')}
      </AlertDescription>
    </Alert>
  )
}
