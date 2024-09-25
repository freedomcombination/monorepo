import * as yup from 'yup'

export const loginSchema = yup.object({
  password: yup.string().required(),
  identifier: yup.string().required(),
})
