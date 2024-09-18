import { Course, Profile } from '@fc/types'
import { emailTemplates } from '../../../../../../emails'
import { sendReactMailByRoles } from '../../../../../utils/sendReactMail'

export const paymentExplanationChanged = async params => {
  if (!params.data.paymentExplanation) return

  const application = await strapi.entityService.findOne(
    'api::course-application.course-application',
    params.where.id,
    {
      populate: '*',
    },
  )

  // TODO remove logs
  console.log({
    app: JSON.stringify(application, null, 2),
    id: params.where,
  })

  await sendReactMailByRoles(['admin', 'academyeditor'], async t => {
    return {
      subject: t('course-applicant-unpaid-preview', {
        name: application?.profile?.name,
      }),
      html: await emailTemplates.renderCourseApplicantWithoutPayment(
        application.profile as unknown as Profile,
        application.course as unknown as Course,
        application.updatedAt.toString(),
        application.paymentExplanation,
        // TODO wish we have locales in profiles :)
      ),
    }
  })
}
