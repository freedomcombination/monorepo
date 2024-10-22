import { emailTemplates } from '../../../../../emails'
import { sendReactMailByRoles } from '../../../../utils/sendReactMail'

export default {
  async afterCreate({ result }) {
    if (result.isVolunteer) {
      await sendReactMailByRoles(
        ['admin', 'humanresource'],
        async t => await emailTemplates.renderVolunteerApplied(result, t),
      )
    }
  },
}
