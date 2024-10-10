import { approvalStatusHasChanged } from './cases/approvalStatus'
import { assignmentFilesUploaded } from './cases/assignmentFilesUploaded'
import { paymentExplanationChanged } from './cases/paymentExplanation'

export default {
  async beforeUpdate(event) {
    const { params } = event

    const application = await strapi.entityService.findOne(
      'api::course-application.course-application',
      params.where.id,
      {
        populate: '*',
      },
    )

    if (!application) return

    if (
      params.data.paymentExplanation && // paymentExplanation must be exist in params
      !application.paymentExplanation
    ) {
      // and model must not have paymentExplanation
      await paymentExplanationChanged(params, application)
    }

    if (
      params.data.submittedAssignmentFiles &&
      (!application.submittedAssignmentFiles ||
        application.submittedAssignmentFiles.length === 0)
    ) {
      await assignmentFilesUploaded(params, application)
    }

    if (
      params.data.approvalStatus &&
      application.approvalStatus !== params.data.approvalStatus
    ) {
      await approvalStatusHasChanged(params, application)
    }
  },
}
