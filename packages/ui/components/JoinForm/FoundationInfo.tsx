import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useJoinFormContext } from './useJoinFormContext'
import { Markdown } from '../Markdown'

export const FoundationInfo = () => {
  const {
    foundationInfo,
    register,
    formState: { errors },
  } = useJoinFormContext()
  const { t } = useTranslation()

  return (
    <Stack direction={{ base: 'column', md: 'column' }} spacing={4}>
      <Markdown source={foundationInfo} />

      <FormControl isRequired isInvalid={!!errors?.foundationConfirmation}>
        <Checkbox {...register('foundationConfirmation')}>
          {t('read-and-accept')}
        </Checkbox>
        <FormErrorMessage>
          {errors?.foundationConfirmation &&
            errors?.foundationConfirmation.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}
