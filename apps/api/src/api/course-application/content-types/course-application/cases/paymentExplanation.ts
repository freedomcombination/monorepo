import { emailTemplates } from '../../../../../../emails'
import { sendReactMailByRoles } from '../../../../../utils/sendReactMail'

export const paymentExplanationChanged = async (params, application) => {
  await sendReactMailByRoles(['admin', 'academyeditor'], async t => {
    return {
      subject: t('course-applicant-unpaid-preview', {
        name: application?.profile?.name,
      }),
      html: await emailTemplates.renderCourseApplicantWithoutPayment(
        application,
        t,
      ),
    }
  })
}
