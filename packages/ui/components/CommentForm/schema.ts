import * as yup from 'yup'

export const commentFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  content: yup.string().required(),
  profile: yup.number(),
})
