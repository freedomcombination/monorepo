import { Stack } from '@chakra-ui/react'

import { LocationForm } from './LocationForm'
import { PhoneForm } from './PhoneForm'
import { useJoinFormContext } from './useJoinFormContext'
import { FormItem } from '../FormItem'

export const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useJoinFormContext()

  return (
    <>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <FormItem
          register={register}
          id="name"
          name="name"
          autoComplete="name"
          errors={errors}
          isRequired
        />
        <FormItem
          name="email"
          id="email"
          autoComplete="email"
          register={register}
          errors={errors}
          isRequired
        />
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <PhoneForm />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          errors={errors}
          isRequired
        />
        <FormItem
          type="date"
          register={register}
          id="birthDate"
          name="birthDate"
          errors={errors}
          isRequired
        />
      </Stack>

      <LocationForm />
    </>
  )
}
