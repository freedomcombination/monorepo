import { emailTemplates } from '../../../../../../emails'
import { sendReactMailByRoles } from '../../../../../utils/sendReactMail'

export const paymentExplanationChanged = async (params, application) => {
  await sendReactMailByRoles(
    ['admin', 'academyeditor'],
    async t =>
      await emailTemplates.renderCourseApplicantWithoutPayment(application, t),
  )
}
