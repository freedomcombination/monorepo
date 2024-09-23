import { useState } from 'react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
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
    <FormControl isInvalid={!!errors.phone}>
      <FormLabel fontWeight={600} fontSize={'sm'} htmlFor="phone">
        Phone Number
      </FormLabel>
      <PhoneInput
        international
        defaultCountry={'NL'}
        value={phoneNumber}
        onChange={handlePhoneChange}
        inputComponent={Input}
      />
      <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
    </FormControl>
  )
}
