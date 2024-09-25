import * as yup from 'yup'

export const contactSchema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
})
