import { useState } from 'react'

import { Input } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import { Field } from '@fc/chakra'

import { useJoinFormContext } from './useJoinFormContext'

import 'yup-phone-lite'

export const PhoneForm = () => {
  const {
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useJoinFormContext() as {
    setValue: (name: string, value: any) => void
    clearErrors: (name: string) => void
    trigger: (name: string) => Promise<boolean>
    formState: { errors: { phone?: { message: string } } }
  }

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)
  const { t } = useTranslation()
  const handlePhoneChange = async (value = '') => {
    setPhoneNumber(value)
    setValue('phone', value)
    if (!value) {
      clearErrors('phone')
    }

    const isValid = await trigger('phone')
    if (isValid) {
      clearErrors('phone')
    }
  }

  return (
    <Field
      invalid={!!errors.phone}
      errorText={errors.phone?.message as string}
      label={t('phone')}
    >
      <PhoneInput
        international
        defaultCountry={'NL'}
        value={phoneNumber}
        onChange={handlePhoneChange}
        inputComponent={Input}
      />
    </Field>
  )
}
