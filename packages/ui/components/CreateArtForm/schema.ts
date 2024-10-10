import * as yup from 'yup'

export const createArtSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  categories: yup.array().of(
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})
