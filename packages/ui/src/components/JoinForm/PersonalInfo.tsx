import { Stack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { GeneralInfo } from './GeneralInfo'
import { LocationForm } from './LocationForm'
import { JoinFormFieldValues } from './types'
import { FormItem } from '../FormItem'

export const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<JoinFormFieldValues>()

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
        <FormItem register={register} id="phone" name="phone" errors={errors} />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          errors={errors}
          isRequired
        />
        <FormItem
          type="number"
          register={register}
          id="age"
          name="age"
          errors={errors}
          isRequired
        />
      </Stack>

      <LocationForm setValue={setValue} />
      <GeneralInfo register={register} errors={errors} />
    </>
  )
}
