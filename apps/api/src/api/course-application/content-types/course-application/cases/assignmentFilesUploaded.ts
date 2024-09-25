import {
  // sendReactMail,
  sendReactMailByRoles,
} from '../../../../../utils/sendReactMail'

export const assignmentFilesUploaded = async params => {
  if (!params.data.submittedAssignmentFiles) return

  const application = await strapi.entityService.findOne(
    'api::course-application.course-application',
    params.where.id,
    {
      populate: '*',
    },
  )

  // if lastUpdateDate has set, dont change it for file upload.
  if (application.lastUpdateDate) return

  await strapi.entityService.update(
    'api::course-application.course-application',
    params.where.id,
    {
      data: {
        lastUpdateDate: new Date(),
      },
    },
  )

  await sendReactMailByRoles(
    ['admin', 'academyeditor'], // TODO check this roles are true
    async () => {
      return {
        // TODO change to email template
        subject: 'Bu arkadaş dosyalarını gönderdi...',
        html: 'Bu arkadaşın dosyaları size ulaştı eğer kurs tanımındaki gün içerisinde cevaplamazsanız red edildi muamelesi görecek.',
      }
    },
  )
}
