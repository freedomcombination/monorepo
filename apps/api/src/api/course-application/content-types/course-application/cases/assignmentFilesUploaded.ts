import {
  // sendReactMail,
  sendReactMailByRoles,
} from '../../../../../utils/sendReactMail'

import { emailTemplates } from '../../../../../../emails'

export const assignmentFilesUploaded = async (params, application) => {
  await sendReactMailByRoles(['admin', 'academyeditor'], async t => {
    return {
      subject: t('course-applicant-submitted-assignment-files-preview', {
        name: application?.profile?.name,
      }),
      html: await emailTemplates.renderCourseApplicantSubmittedAssignmentFiles(
        application,
        t,
      ),
    }
  })
}
