import * as yup from 'yup'

// TODO: @ekrem fix yup schema add methot and reduce opt.
// Link: https://stackoverflow.com/questions/69176340/yup-addmethod-not-working-in-typescript-yup-version

export const joinSchema = () => {
  yup.addMethod(
    yup.object,
    'atLeastOneRequired',
    function (list: Array<any>, message) {
      return this.test({
        name: 'atLeastOneRequired',
        message,
        exclusive: true,
        params: { keys: list.join(', ') },
        test: value =>
          value == null || list.some(f => !!value[`${f.id}_${f.slug}`]),
      })
    },
  )

  return yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required(),
    city: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    occupation: yup.string(),
    comment: yup.string(),
    inMailingList: yup.boolean(),
    isPublic: yup.boolean(),
    availableHours: yup.number().min(1).max(40).required(),
    heardFrom: yup.array().required().min(1),
    jobs: yup.array().required().min(1),
  })
}
