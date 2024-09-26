import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'

import { Job } from '@fc/types'
import 'yup-phone-lite'

export const useJoinFormSchema = (jobs: Job[]) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

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
    name: yup
      .string()
      .min(3)
      .matches(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed')
      .required(),
    birthDate: yup.string().required(),
    address: yup
      .object()
      .shape({
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        street: yup.string(),
        postcode: yup.string(),
      })
      .required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required('Phone number is required')
      .test(
        'is-valid-phone',
        'Please enter a valid phone number',
        function (value) {
          return yup.string().phone().isValidSync(value)
        },
      ),
    comment: yup.string(),
    inMailingList: yup.boolean(),
    isPublic: yup.boolean(),
    availableHours: yup.number().min(1).max(40).required(),
    heardFrom: yup.array().required().min(1),
    jobs: yup.array().required().min(1),
    cv: yup.mixed(),
    foundationConfirmation: yup
      .boolean()
      .oneOf([true], t('read-and-accept-required'))
      .required(),
    // Make it required only if the jobs props contains selected jobs and it has info_${locale} field
    jobInfoConfirmation: yup
      .boolean()
      .test(
        'job-info-confirmation',
        t('read-and-accept-required'),
        function test(value) {
          const selectedJobs = jobs.filter(job =>
            this.parent.jobs?.includes(`${job.id}`),
          )
          const hasInfo = selectedJobs.some(job => job[`info_${locale}`])

          return !hasInfo || value
        },
      ),
  })
}
