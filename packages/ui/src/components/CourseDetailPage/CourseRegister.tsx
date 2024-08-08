import {
  Center,
  BoxProps,
  Spinner,
  Alert,
  AlertProps,
  AlertIcon,
  AlertDescription,
  Stack,
  Heading,
  AlertTitle,
} from '@chakra-ui/react'
import { isPast } from 'date-fns/isPast'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context'

import { CourseApplicationForm } from './CourseApplicationForm'
import { CourseApplicationPayForm } from './CourseApplicationPayForm'
import { useCourseContext } from './CourseContext'
import { ProfileMenu } from '../Header/ProfileMenu'

export const CourseRegister = () => {
  const { isLoading, myApplication, course } = useCourseContext()
  const { user, profile } = useAuthContext()
  const { t } = useTranslation()

  const courseLastRegisterDate = course.lastRegisterDate

  const style = {
    maxW: '3xl',
    w: 'full',
    alignSelf: 'center',
    minH: '200px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    spacing: 8,
    gap: 4,
    p: 8,
    borderWidth: 1,
    rounded: 'md',
  }

  if (courseLastRegisterDate) {
    const isRegisterPast = isPast(courseLastRegisterDate)
    if (isRegisterPast) {
      return (
        <Alert status={'info'} variant="subtle" {...(style as AlertProps)}>
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
      <Center {...(style as BoxProps)}>
        <Spinner size={'xl'} />
      </Center>
    )
  }

  // show login alert if user is not logged in
  if (!user || !profile) {
    return (
      <Alert status={'info'} variant="subtle" {...(style as AlertProps)}>
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
      <Stack bg={'white'} {...(style as BoxProps)}>
        <Heading as={'h3'} size={'lg'}>
          {t('course.application-title')}
        </Heading>
        <CourseApplicationForm />
      </Stack>
    )
  }

  // show payment form if user has already applied and not paid yet
  if (!myApplication.hasPaid && !myApplication.paymentExplanation) {
    return (
      <Stack bg={'white'} {...(style as BoxProps)}>
        <Heading as={'h3'} size={'lg'}>
          {t('course.application-pay-title')}
        </Heading>
        <CourseApplicationPayForm />
      </Stack>
    )
  }

  return (
    <Alert status={'success'} variant="subtle" {...(style as AlertProps)}>
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle>Thank you!</AlertTitle>
      <AlertDescription maxWidth="sm">
        Kursa başarı ile kaydınız yapıldı.
      </AlertDescription>
    </Alert>
  )
}
