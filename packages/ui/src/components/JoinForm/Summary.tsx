import { Button, ButtonGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { PreviewVolunteerForm } from './PreviewVolunteerForm'
import { useJoinFormContext } from './useJoinFormContext'
import { FormItem } from '../FormItem'

export const Summary = () => {
  const {
    isLoading,
    register,
    formState: { errors, isValid },
  } = useJoinFormContext()
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
