import { FC, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { setLocale } from 'yup'
import { en, nl, tr } from 'yup-locales'

import { sleep } from '@fc/utils'

import { JoinFormContext } from './JoinFormContext'
import { joinSchema } from './schema'
import { JoinFormFieldValues, JoinFormProviderProps } from './types'

export const JoinFormProvider: FC<JoinFormProviderProps> = ({
  children,
  defaultJobs,
}) => {
  const { locale } = useRouter()

  const form = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onBlur',
    defaultValues: {
      jobs: defaultJobs,
      name: '',
      age: 0,
      address: { country: '', city: '', street: '', postcode: '' },
      email: '',
      phone: '',
      comment: '',
      inMailingList: false,
      isPublic: false,
      availableHours: 0,
      heardFrom: [],
      cv: undefined,
      foundationConfirmation: false,
      jobInfoConfirmation: false,
    },
  })

  const {
    trigger,
    clearErrors,
    formState: { errors },
  } = form

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    else if (locale === 'nl') setLocale(nl)
    else setLocale(en)

    const updateErrorFields = async () => {
      await sleep(100)
      const errorKeys = Object.keys(errors) as (keyof JoinFormFieldValues)[]

      errorKeys.forEach(fieldName => {
        if (errors[fieldName]) {
          clearErrors(fieldName)
          trigger(fieldName)
        }
      })
    }
    updateErrorFields()
  }, [locale])

  return (
    <FormProvider {...form}>
      <JoinFormContext.Provider value={{}}>{children}</JoinFormContext.Provider>
    </FormProvider>
  )
}
