import * as yup from 'yup'

export const createTweetSchema = yup.object({
  text: yup.string().required('Title is required'),
  image: yup.mixed(),
  mentions: yup.array().of(
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})
