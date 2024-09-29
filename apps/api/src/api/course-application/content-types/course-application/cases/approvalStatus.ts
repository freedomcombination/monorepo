import { emailTemplates } from '../../../../../../emails'
import { sendReactMail } from '../../../../../utils/sendReactMail'

export const approvalStatusHasChanged = async (params, application) => {
  const receiver = [
    {
      email: application?.profile?.email,
      locale: application?.profile?.locale,
    },
  ]
  const approved = application?.approvalStatus === 'approved'

  if (approved) {
    // update lastUpdateDate to check payment ll be made in time (like in 7 days)
    await strapi.entityService.update(
      'api::course-application.course-application',
      params.where.id,
      {
        data: {
          lastUpdateDate: new Date(),
        },
      },
    )
  }

  await sendReactMail(receiver, async t => {
    return {
      subject: t(
        approved
          ? 'course-applicant-approved-preview'
          : 'course-applicant-rejected-preview',
      ),
      html: await emailTemplates.renderCourseApplicantApprove(application, t),
    }
  })
}
