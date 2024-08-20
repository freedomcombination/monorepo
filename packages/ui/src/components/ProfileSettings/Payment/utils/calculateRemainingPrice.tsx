
import { Course, CourseApplication } from "@fc/types"


export const calculateRemainingPrice = (course: Course, application: CourseApplication) => {
  if (!course.price) return 0 // it is a free course

  // that means "somehow" the applicant has no remaining fee
  if (application.hasPaid) return 0

  const payments = application.payments || []
  if (payments.length > 0) {
    // that means the applicant had made at least one payment
    const totalAmount = payments.reduce((acc, payment) => {
      if (payment.status === 'paid') {
        return acc + payment.amount
      }

      return acc
    }, 0)

    return course.price - totalAmount
  }

  if (
    application.paymentExplanation &&               // application inform an explanation for payment
    application.approvalStatus !== 'rejected' &&    // admin didn't reject the application
    application.installmentCount === 0              // and admin did not make any installment
  ) {
    return 0  // it means the applicant has no remaining fee
  }

  return course.price
}

