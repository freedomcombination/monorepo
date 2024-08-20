import { isPast } from 'date-fns/isPast'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Course, CourseApplication } from '@fc/types'
import { formatDate } from '@fc/utils'

import { calculateRemainingPrice } from './calculateRemainingPrice'

export const GetGeneralStatus = (
  course: Course,
  application: CourseApplication,
) => {
  const remaining = calculateRemainingPrice(course, application)
  const hasFinished = isPast(course.endDate)
  const hasStarted = isPast(course.startDate)
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (remaining > 0) {
    if (hasFinished) {
      return {
        message: t('course.payment.message.unpaid-finished', { amount: remaining }),
        color: 'red',
      }
    }

    if (hasStarted) {
      return {
        message: t('course.payment.message.unpaid-unfinished', { amount: remaining }),
        color: 'red',
      }
    }

    return {
      message: t('course.payment.message.unpaid-not-started', { amount: remaining, date: formatDate(course.startDate, 'dd MMMM yyyy', locale) }),
      color: 'red',
    }
  }

  if (hasFinished) {
    return { message: t('course.payment.message.finished'), color: 'green' }
  }

  if (hasStarted) {
    return { message: t('course.payment.message.unfinished'), color: 'green' }
  }

  return {
    message: t('course.payment.message.not-started', { date: formatDate(course.startDate, 'dd MMMM yyyy', locale) }),
    color: 'green',
  }
}
