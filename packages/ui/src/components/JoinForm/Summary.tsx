import React from 'react'

import { Button, ButtonGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { PreviewVolunteerForm } from './PreviewVolunteerForm'
import { JoinFormFieldValues } from './types'
import { useJoinFormContext } from './useJoinFormContext'
import { FormItem } from '../FormItem'

export const Summary = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext<JoinFormFieldValues>()
  const { isLoading } = useJoinFormContext()
  const { t } = useTranslation()

  return (
    <Stack spacing={4}>
      <Text>
        You completed the volunteer form. If you want to add one, we would to
        hear from you.
      </Text>
      {/* comment */}
      <FormItem
        as={Textarea}
        register={register}
        errors={errors}
        id="comment"
        name="comment"
      />
      <ButtonGroup
        size={'sm'}
        overflowX={'auto'}
        justifyContent={'center'}
        spacing={4}
      >
        {isValid && <PreviewVolunteerForm />}
        <Button isLoading={isLoading} type="submit" size={'lg'}>
          {t('submit')}
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
