import { Course, Profile } from '@fc/types'
import { emailTemplates } from '../../../../../emails'
import { getTranslate } from '../../../../../emails/utils/getTranslate'

export default {
  async afterUpdate(event) {
    const { params } = event
    if (params.data.paymentExplanation) {
      const application = await strapi.entityService.findOne(
        'api::course-application.course-application',
        params.where.id,
        {
          populate: '*',
        },
      )
      console.log({
        app: JSON.stringify(application, null, 2),
        id: params.where,
      })

      const officers = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: {
            role: {
              type: {
                $in: ['admin'], // who else we must send ??
              },
            },
          },
        },
      )
      const officerEmails = officers.map(editor => editor.email)

      if (officerEmails.length === 0) {
        strapi.log.error('course-application:afterUpdate : No mail exists')

        return
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(
          'Wont send email in development mode. Emails:',
          officerEmails,
        )

        return
      }

      const { t } = getTranslate('en')
      await strapi.plugins['email'].services.email.send({
        to: officerEmails,
        from: process.env.SMTP_USERNAME,
        subject: t('course-applicant-unpaid-preview', {
          name: application?.profile?.name,
        }),
        html: emailTemplates.renderCourseApplicantWithoutPayment(
          application.profile as unknown as Profile,
          application.course as unknown as Course,
          application.updatedAt.toString(),
          application.paymentExplanation,
          // TODO wish we have locales in profiles :)
        ),
      })
    }
  },
}
