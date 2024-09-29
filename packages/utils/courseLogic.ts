import { addDays, endOfDay, isPast } from 'date-fns'
import { addMonths } from 'date-fns/addMonths'

import { ALLOW_COURSE_PAYMENT } from '@fc/config/constants'
import {
  Course,
  CourseApplication,
  CoursePayment,
  Profile,
  StrapiLocale,
} from '@fc/types'

import { formatDate } from './formatDate'
import { formatPrice } from './formatPrice'
import { I18nNamespaces } from '../ui/@types/i18next'

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
  allUnPaidInstallments: Installment[]
  dueUnPaidInstallments: Installment[]
  paidInstallments: Installment[]
  unPaidInstallments: Installment[]

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
    this.paidInstallments = this.myInstallments.filter(i => !!i.payment)
    this.allUnPaidInstallments = this.myInstallments.filter(i => !i.payment)
    this.dueUnPaidInstallments = this.allUnPaidInstallments.filter(i =>
      isPast(addDays(i.date, 7)),
    )
    this.unPaidInstallments = this.allUnPaidInstallments.filter(
      i =>
        !this.dueUnPaidInstallments.some(
          due => due.installmentNumber === i.installmentNumber,
        ),
    )
    this.validApplicants = this.findValidApplicants()
  }

  isRejected(): null | keyof I18nNamespaces['common'] {
    // if admin sets approvalStatus to 'rejected', it's rejected
    if (this.myApplication?.approvalStatus === 'rejected')
      return 'course.application.reject.reason.by-admin'

    // if course requireApproval is not set, don't look further
    if (!this.isAssignmentInProgress()) return null

    // if applicant missed the deadline, it's rejected
    if (this.isSubmitFilesDeadlinePassed())
      return 'course.application.reject.reason.deadline'

    // if admin somehow didn't take an action, it's rejected
    if (this.isEvaluationDeadlinePassed())
      return 'course.application.reject.reason.evaluation'

    // otherwise, it's on progress
    return null
  }

  isSubmitFilesDeadlinePassed() {
    // if course requireApproval is not set, don't look further
    if (!this.course.requireApproval) return false

    // if applicant already submitted files, don't look further
    if (this.haveSubmittedAssignmentFiles()) return false

    // applicant hasn't submitted files then check the date.
    return isPast(this.getDeadlineDate())
  }

  isEvaluationDeadlinePassed() {
    // if course requireApproval is not set, don't look further
    if (!this.course.requireApproval) return false

    // if submittal deadline passed, no need to check evaluation deadline
    if (this.isSubmitFilesDeadlinePassed()) return true

    // admins haven't decide yet. check the date.
    return isPast(this.getEvaluationDate())
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
    if (
      application.submittedAssignmentFiles &&
      application.submittedAssignmentFiles.length > 0
    ) {
      // if there is a file, start evaluation date from the creation date of the file
      const date = application.submittedAssignmentFiles[0].createdAt
      const evalDate = addDays(
        date, // and add evaluation time
        this.course.assignmentEvaluationTime ??
          DEFAULT_ASSIGNMENT_EVALUATION_TIME,
      )

      return endOfDay(evalDate)
    }

    // otherwise, start evaluation date from the creation date of the application
    const date = application.createdAt
    const evalDate = addDays(
      date, // and add evaluation time + submission deadline
      (this.course.assignmentEvaluationTime ??
        DEFAULT_ASSIGNMENT_EVALUATION_TIME) +
        (this.course.assignmentSubmissionDeadline ??
          DEFAULT_ASSIGNMENT_SUBMISSION_DEADLINE),
    )

    return endOfDay(evalDate)
  }

  haveSubmittedAssignmentFiles() {
    if (!this.myApplication) return false

    return (
      !!this.myApplication.submittedAssignmentFiles &&
      this.myApplication.submittedAssignmentFiles.length > 0
    )
  }

  getFilesSubmittedDate() {
    if (this.haveSubmittedAssignmentFiles()) {
      return new Date(
        this.myApplication!.submittedAssignmentFiles![0].createdAt,
      )
    }

    return null
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

  getTotalPrice() {
    return (this.course.price ?? 0) - (this.myApplication?.discount ?? 0)
  }

  getRemainingPrice() {
    return this.getTotalPrice() - this.getTotalPaid()
  }

  getTotalPaid() {
    return this.paidInstallments.reduce((acc, cur) => acc + cur.amount, 0)
  }

  getMessage(locale: StrapiLocale) {
    type Message = {
      message: keyof I18nNamespaces['common']
      obj?: object
      color: 'green' | 'red'
    }

    const course = this.course

    const isRejected = this.isRejected()
    if (isRejected) {
      return {
        message: 'course.application.message.rejected-with-reason',
        color: 'red',
        obj: {
          msg: isRejected as string,
        },
      } satisfies Message
    }

    if (this.isAssignmentInProgress()) {
      if (this.haveSubmittedAssignmentFiles()) {
        return {
          message: 'course.payment.message.waiting-for-eval',
          color: 'green',
        } satisfies Message
      }

      return {
        message: 'course.payment.message.waiting-for-files',
        color: 'green',
        obj: {
          date: formatDate(this.getDeadlineDate(), 'dd MMMM yyyy', locale),
        },
      } satisfies Message
    }

    const remaining = this.allUnPaidInstallments.reduce(
      (acc, cur) => acc + cur.amount,
      0,
    )
    const hasFinished = isPast(course.endDate)
    const hasStarted = isPast(course.startDate)
    const remainingStr = formatPrice(remaining)

    if (remaining > 0 && ALLOW_COURSE_PAYMENT) {
      if (hasFinished) {
        return {
          message: 'course.payment.message.unpaid-finished',
          obj: { amount: remainingStr },
          color: 'red',
        } satisfies Message
      }

      if (hasStarted) {
        return {
          message: 'course.payment.message.unpaid-unfinished',
          obj: { amount: remainingStr },
          color: 'red',
        } satisfies Message
      }

      return {
        message: 'course.payment.message.unpaid-not-started',
        obj: {
          amount: remainingStr,
          date: formatDate(course.startDate, 'dd MMMM yyyy', locale),
        },
        color: 'red',
      } satisfies Message
    }

    if (hasFinished) {
      return {
        message: 'course.payment.message.finished',
        color: 'green',
      } satisfies Message
    }

    if (hasStarted) {
      return {
        message: 'course.payment.message.unfinished',
        color: 'green',
      } satisfies Message
    }

    return {
      message: 'course.payment.message.not-started',
      obj: { date: formatDate(course.startDate, 'dd MMMM yyyy', locale) },
      color: 'green',
    } satisfies Message
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
