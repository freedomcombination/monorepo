import { sendReactMailByRoles } from '../../../../../utils/sendReactMail'

import { emailTemplates } from '../../../../../../emails'

export const assignmentFilesUploaded = async (params, application) => {
  await sendReactMailByRoles(
    ['admin', 'academyeditor'],
    async t =>
      await emailTemplates.renderCourseApplicantSubmittedAssignmentFiles(
        application,
        t,
      ),
  )
}
