import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'
import * as yup from 'yup'

import { EMAIL_SENDER } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { sendEmail } from '@fc/services'
import { EmailCreateInput } from '@fc/types'

import { FormItem } from '../../components'

interface ProfileMailFormProps {
  email: string
}

const schema = yup.object().shape({
  subject: yup.string().required(),
  content: yup.string().required(),
})

type EmailFormValues = yup.InferType<typeof schema>

export const ProfileMailForm: FC<ProfileMailFormProps> = ({ email }) => {
  const { token } = useAuthContext()
  const { t } = useTranslation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: yupResolver(schema),
  })

  const {
    error,
    isPending,
    isSuccess,
    mutateAsync: sendForm,
  } = useMutation({
    mutationKey: ['email-profile'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, token as string)
    },
  })

  const onSubmit = async (data: EmailFormValues) => {
    try {
      const emailData: EmailCreateInput = {
        to: email,
        from: EMAIL_SENDER,
        subject: data.subject,
        text: data.content,
      }

      await sendForm(emailData)
      reset()
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Stack spacing={4}>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormItem
            name="subject"
            register={register}
            errors={errors}
            isRequired
          />
          <FormItem
            name="content"
            as={Textarea}
            register={register}
            errors={errors}
            isRequired
          />

          <Button
            display={{ base: 'none', sm: 'flex' }}
            alignSelf="flex-end"
            rightIcon={<FiArrowRight />}
            type="submit"
            isDisabled={!isValid}
            isLoading={isPending}
          >
            Send
          </Button>
        </Stack>
      </Stack>

      {isSuccess && (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>
            <Text>{t('contact.form.success')}</Text>
          </AlertDescription>
        </Alert>
      )}
      {error?.message && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            <>{t('contact.form.failed')} </>
            {error.message}
          </AlertDescription>
        </Alert>
      )}
    </Stack>
  )
}
