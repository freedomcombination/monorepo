import { addDays, endOfDay, isPast } from 'date-fns'
import { addMonths } from 'date-fns/addMonths'

import { Course, CourseApplication, CoursePayment, Profile } from '@fc/types'

interface Installment {
  date: Date
  amount: number
  payment: CoursePayment | null
  installmentNumber: number
}

// this is just in case, course.assignmentSubmissionDeadline should never null
const DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE = 3
const DEFAULT_ASSIGNMENT_EVALUATION_TIME = 2
// const DEFAULT_PAYMENT_EXPECT_TIME = 7

export class CourseLogic {
  course: Course
  courseApplicants: CourseApplication[]
  validApplicants: CourseApplication[]
  profile: Profile | null
  myApplication: CourseApplication | undefined
  myInstallments: Installment[]

  constructor(
    course: Course,
    courseApplicants: CourseApplication[],
    profile: Profile | null,
  ) {
    this.course = course!
    this.courseApplicants = courseApplicants!
    this.profile = profile
    this.myApplication = this.courseApplicants.find(
      application => application.profile?.id === this.profile?.id,
    )
    this.myInstallments = this.calculateInstallments()
    this.validApplicants = this.findValidApplicants()
  }

  isRejected() {
    return this.myApplication?.approvalStatus === 'rejected'
  }

  isAssignmentInProgress() {
    // if course requireApproval is not set, return false
    if (!this.course.requireApproval) return false

    // if myApplication is approved, return false (which means assignment progress is done)
    if (this.myApplication?.approvalStatus === 'approved') return false

    return true
  }

  getEvaluationDate() {
    const application = this.myApplication!
    let evalDate
    if (application.lastUpdateDate) {
      evalDate = addDays(
        application.lastUpdateDate,
        this.course.assignmentEvaluationTime ??
          DEFAULT_ASSIGNMENT_EVALUATION_TIME,
      )
    } else {
      evalDate = addDays(
        application.createdAt,
        (this.course.assignmentSubmissionDeadline ??
          DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE) +
          (this.course.assignmentEvaluationTime ??
            DEFAULT_ASSIGNMENT_EVALUATION_TIME),
      )
    }

    return endOfDay(evalDate)
  }

  haveSubmittedAssignmentFiles() {
    if (!this.myApplication) return false

    return (
      !!this.myApplication.submittedAssignmentFiles &&
      this.myApplication.submittedAssignmentFiles.length > 0
    )
  }

  getDeadlineDate() {
    const application = this.myApplication!
    const applicationDate = application.createdAt
    const deadlineDate = addDays(
      applicationDate,
      this.course.assignmentSubmissionDeadline ??
        DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE,
    )

    return endOfDay(deadlineDate)
  }

  shouldShowPaymentDetails() {
    return (
      !this.course.requireApproval ||
      this.myApplication?.approvalStatus === 'approved'
    )
  }

  findValidApplicants() {
    return this.courseApplicants.filter(application => {
      // Step 0 - if application is not approved, return false
      if (application.approvalStatus === 'rejected') return false

      if (
        this.course.requireApproval &&
        application.approvalStatus !== 'approved'
      ) {
        return this.checkAssignmentCases(application)
      }

      return this.checkPaymentCases(application)
    })
  }

  checkAssignmentCases(application: CourseApplication) {
    // Step 1 - check if applicant has send files in time
    if (
      !application.submittedAssignmentFiles ||
      application.submittedAssignmentFiles.length === 0
    ) {
      // applicant has not send files
      const dueDate = addDays(
        application.createdAt,
        this.course.assignmentSubmissionDeadline ??
          DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE,
      )
      const endOfDueDate = endOfDay(dueDate)

      if (isPast(endOfDueDate)) {
        return false // this is just like application.approvalStatus === 'rejected'
      }

      // applicant has time, so save quota.
      return true
    }

    // Step 2 - check if applicant send files but didn't receive any approvement
    const dueEvalDate = application.lastUpdateDate
      ? addDays(
          application.lastUpdateDate,
          this.course.assignmentEvaluationTime ??
            DEFAULT_ASSIGNMENT_EVALUATION_TIME,
        )
      : addDays(
          application.createdAt,
          (this.course.assignmentSubmissionDeadline ??
            DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE) +
            (this.course.assignmentEvaluationTime ??
              DEFAULT_ASSIGNMENT_EVALUATION_TIME),
        )

    const endOfDueEvalDate = endOfDay(dueEvalDate)

    if (isPast(endOfDueEvalDate)) {
      return false // this is shouldn't happen because it's on us.
    }

    return true
  }

  anyPayments(application: CourseApplication) {
    const payments = application.payments || []
    if (payments.length > 0) {
      const anyValidPayment = payments.some(
        /*
           we don't care if the payment fully made, 
           only looking if there is any valid payment.

           why we only care if the payment partially made?
           because if there is a payment these are the reason:
           - applicant made full payment
           - applicant ask installment and admin accept it so there is partial payment
        */
        payment => payment?.status === 'paid',
      )
      if (anyValidPayment) return true
    }

    return false
  }

  isManualFirstPaymentDateNotPassed(application: CourseApplication) {
    /*
       there is another case.
       if applicant ask for delay and admin accept it
       admin set a new date to start installment
       if that date is in the future return true
       if its not future so it has to be a payment so Step - 2 takes care of it.
     */
    if (
      application.installmentStartAfter &&
      isPast(application.installmentStartAfter) === false
    )
      return true

    return false
  }

  hasAnyExplanation(application: CourseApplication) {
    /* paymentExplanation : if user has an explanation
     user inform an explanation about the payment
     and has not been rejected by admin (if approvalStatus is rejected those applications will be ignored)
     this case can be end up with installment payment which ll be handled in step 2 or 3
    */
    return !!application.paymentExplanation
  }

  checkPaymentCases(application: CourseApplication) {
    // its free course...
    if (this.course.price === 0) return true

    // Step 1 - if admin manually set hasPaid to true, return true
    if (application.hasPaid) return true

    // Step 2 - if paid, return true
    if (this.anyPayments(application)) return true

    // Step - 3
    if (this.isManualFirstPaymentDateNotPassed(application)) return true

    // Step - 4
    if (this.hasAnyExplanation(application)) return true

    // Step - 5
    // TODO: in all other cases system expects a payment in 7 days
    return false
  }

  getMyPaymentCases() {
    if (!this.myApplication) return false

    return this.checkPaymentCases(this.myApplication)
  }

  calculateInstallments = (): Installment[] => {
    if (!this.course || !this.course.price || !this.myApplication) return []

    const price = this.course.price - (this.myApplication.discount ?? 0)
    const installmentCount = this.myApplication.installmentCount || 1
    const installmentStartAfter =
      this.myApplication.installmentStartAfter ?? this.myApplication.createdAt
    const installmentInterval = Math.max(
      1,
      this.myApplication.installmentInterval || 1,
    )
    const successfulPayments =
      this.myApplication.payments?.filter(
        payment => payment.status === 'paid',
      ) ?? []
    const installmentDates: Installment[] = []
    const soFarPayment = successfulPayments.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    )
    const installmentAmount =
      (price - soFarPayment) / (installmentCount - successfulPayments.length)

    for (let i = 0; i < installmentCount; i++) {
      installmentDates.push({
        date: addMonths(installmentStartAfter, i * installmentInterval),
        amount: installmentAmount,
        installmentNumber: i + 1,
        payment: null,
      })
    }

    for (const payment of successfulPayments) {
      const installmentIndex = payment.installmentNumber - 1
      installmentDates[installmentIndex].payment = payment
      installmentDates[installmentIndex].amount = payment.amount
    }

    return installmentDates
  }
}
