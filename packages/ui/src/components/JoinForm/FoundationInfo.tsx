import { FC, useEffect, useState } from 'react'

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Foundation } from '@fc/types'

import { JoinFormFieldValues } from './types'
import { Markdown } from '../Markdown'

type FoundationInfoProps = {
  foundation: Foundation[]
  register: UseFormRegister<JoinFormFieldValues>
  errors: FieldErrors<JoinFormFieldValues>
}

export const FoundationInfo: FC<FoundationInfoProps> = ({
  foundation,
  register,
  errors,
}) => {
  const [serializedContent, setSerializedContent] = useState<any[]>([])
  const { t } = useTranslation()
  useEffect(() => {
    const serializeMarkdown = async () => {
      const serializedData = await Promise.all(
        foundation.map(async item => {
          const serializedItem = await serialize(item.about || '')

          return serializedItem
        }),
      )
      setSerializedContent(serializedData)
    }

    serializeMarkdown()
  }, [foundation])

  return (
    <Stack direction={{ base: 'column', md: 'column' }} spacing={4}>
      {serializedContent.map((source, index) => (
        <Markdown key={index} source={source} />
      ))}
      <FormControl isRequired isInvalid={!!errors?.foundationConfirmation}>
        <Checkbox
          {...register('foundationConfirmation', {
            required: 'You must accept the Foundation information',
          })}
        >
          {t('I have read and accept the Foundation information')}
        </Checkbox>
        <FormErrorMessage>
          {errors?.foundationConfirmation &&
            errors?.foundationConfirmation.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}
