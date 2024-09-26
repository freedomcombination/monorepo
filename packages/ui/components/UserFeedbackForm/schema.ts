import * as yup from 'yup'

export const createUserFeedbackSchema = yup.object({
  comment: yup.string().required('Comment is required'),
  image: yup.mixed(),
  point: yup.number(),
})
