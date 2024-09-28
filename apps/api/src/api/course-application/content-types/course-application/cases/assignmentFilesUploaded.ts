import {
  // sendReactMail,
  sendReactMailByRoles,
} from '../../../../../utils/sendReactMail'

export const assignmentFilesUploaded = async (params, application) => {
  console.log('assignmentFilesUploaded', params, application)
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
