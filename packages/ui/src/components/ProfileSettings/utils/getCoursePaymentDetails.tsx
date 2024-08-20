import { isAfter, addMonths } from "date-fns"
import { format } from "date-fns-tz"

import { Course, CourseApplication } from "@fc/types"

import { calculateRemainingPrice } from "./calculateRemainingPrice"
import { PaymentButton } from "./PaymentButton"
import { LineText } from "./PaymentLine"




export const getCoursePaymentDetails = (course: Course, application: CourseApplication) => {
  if (!course.price) return
  const remaining = calculateRemainingPrice(course, application)
  if (remaining === 0) {
    return (
      <LineText
        title={'Ödenen Toplam Tutar'}
        value={`${course.price} euro`}
      />
    )
  }

  const installmentCount = application.installmentCount || 1

  if (installmentCount === 1) {
    return (
      <LineText
        title={'Kalan ücreti öde'}
        value={<PaymentButton amount={remaining} />}
      />
    )
  }

  const successfulPayments =
    application.payments?.filter(payment => payment.status === 'paid') ?? []
  const remainingInstallments = Math.max(
    installmentCount - successfulPayments.length,
    1,
  )
  const lastSuccessfulPaymentData = successfulPayments.reduce(
    (acc, payment) => {
      if (isAfter(payment.paymentDatetime, acc)) {
        return payment.paymentDatetime
      }

      return acc
    },
    application.createdAt,
  )

  const installmentDates = new Array(remainingInstallments)
    .fill(0)
    .map((_, index) => {
      return {
        date: addMonths(lastSuccessfulPaymentData, index + 1),
        amount: remaining / remainingInstallments,
      }
    })

  return (
    <>
      {successfulPayments.length > 0 &&
        successfulPayments.map(payment => (
          <LineText
            key={payment.id}
            title={`${format(payment.paymentDatetime, 'dd MM yyyy - HH:mm')} tarihinde`}
            value={`${payment.amount} euro ödendi.`}
          />
        ))}
      {installmentDates.map(({ date, amount }, index) => (
        <LineText
          key={date.toString()}
          title={`${index + 1}. taksit ${format(date, 'MMMM yyyy')} tarihinde`}
          value={<PaymentButton amount={amount} />}
        />
      ))}
    </>
  )
}
