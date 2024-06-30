import * as yup from 'yup'

export const yupSelect = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
})

export const yupMultiSelect = yup.array().of(yupSelect)
