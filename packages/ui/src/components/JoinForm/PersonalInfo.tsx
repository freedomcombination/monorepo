import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { GeneralInfo } from './GeneralInfo'
import { JoinFormFieldValues } from './types'
import { FormItem } from '../FormItem'

export type PersonalInfoProps = {
  register: UseFormRegister<JoinFormFieldValues>
  errors: FieldErrors<JoinFormFieldValues>
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ register, errors }) => {
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
      <FormItem
        register={register}
        errors={errors}
        id="city"
        name="city"
        autoComplete="city"
        isRequired
      />
      <GeneralInfo register={register} errors={errors} />
    </>
  )
}
