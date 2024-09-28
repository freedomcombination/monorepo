import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { LocationForm } from './LocationForm'
import { PhoneForm } from './PhoneForm'
import { useJoinFormContext } from './useJoinFormContext'
import { FormItem } from '../FormItem'

export const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useJoinFormContext()
  const { locale } = useRouter()
  const avaibleHourExplanation = {
    en: 'Please indicate the total number of hours per week you can dedicate to the profession in which you wish to volunteer.',
    nl: 'Geef alstublieft het totale aantal uren per week aan dat u kunt besteden aan het beroep waarin u vrijwilligerswerk wilt doen.',
    tr: 'Gönüllü olmak istediğiniz meslekle ilgili haftada ayırabileceğiniz toplam saat süresini belirtiniz.',
  }

  return (
    <>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
        <FormItem
          register={register}
          id="name"
          name="name"
          autoComplete="name"
          errors={errors}
          required
        />
        <FormItem
          name="email"
          id="email"
          autoComplete="email"
          register={register}
          errors={errors}
          required
        />
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
        <PhoneForm />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          tooltip={avaibleHourExplanation[locale]}
          errors={errors}
          required
        />
        <FormItem
          type="date"
          register={register}
          id="birthDate"
          name="birthDate"
          errors={errors}
          required
        />
      </Stack>

      <LocationForm />
    </>
  )
}
