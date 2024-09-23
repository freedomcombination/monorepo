import * as yup from 'yup'

export const adminLoginSchema = yup.object({
  password: yup.string().required(),
  identifier: yup.string().required(),
})
