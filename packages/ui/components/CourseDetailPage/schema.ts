import * as yup from 'yup'

export const applicationSchema = () =>
  yup.object({
    country: yup.string().defined(),
    city: yup.string().defined(),
    phone: yup.string().defined(),
    message: yup.string().defined(),
  })
