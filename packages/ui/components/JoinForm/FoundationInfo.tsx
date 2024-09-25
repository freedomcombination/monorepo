import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useJoinFormContext } from './useJoinFormContext'
import { BlocksRenderer } from '../BlocksRenderer'

export const FoundationInfo = () => {
  const {
    foundationInfo,
    register,
    formState: { errors },
  } = useJoinFormContext()
  const { t } = useTranslation()

  return (
    <Stack direction={{ base: 'column', md: 'column' }} spacing={4}>
      <Box
        maxH={500}
        overflowY={'auto'}
        borderWidth={1}
        borderColor={'gray.100'}
        bg={'gray.50'}
        p={4}
        rounded={'md'}
      >
        <BlocksRenderer content={foundationInfo} />
      </Box>

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
