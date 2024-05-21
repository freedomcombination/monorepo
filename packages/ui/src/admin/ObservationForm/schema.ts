import * as yup from 'yup'

export const observationFormSchema = yup.object({
  content: yup.string().required(),
  profile: yup.number().required(),
})
