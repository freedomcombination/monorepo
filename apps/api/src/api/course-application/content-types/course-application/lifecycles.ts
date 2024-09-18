import { paymentExplanationChanged } from './cases/paymentExplanation'
import { assignmentFilesUploaded } from './cases/assignmentFilesUploaded'
import { approvalStatusHasChanged } from './cases/approvalStatus'

export default {
  async afterUpdate(event) {
    const { params } = event

    if (params.data.paymentExplanation) {
      await paymentExplanationChanged(params)
    }

    if (params.data.submittedAssignmentFiles) {
      await assignmentFilesUploaded(params)
    }

    if (params.data.approvalStatus) {
      await approvalStatusHasChanged(params)
    }
  },
}
