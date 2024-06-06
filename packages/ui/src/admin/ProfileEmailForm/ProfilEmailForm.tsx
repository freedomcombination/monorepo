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
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'
import * as yup from 'yup'

import { useCreateModelMutation, useSendEmail } from '@fc/services'
import {
  EmailCreateInput,
  Observation,
  ObservationCreateInput,
} from '@fc/types'
import { toastMessage } from '@fc/utils'

import { FormItem } from '../../components'

interface ProfileMailFormProps {
  email: string
  profileId: number
  onSuccess?: () => void
}

const schema = yup.object().shape({
  subject: yup.string().required(),
  content: yup.string().required(),
})

type EmailFormValues = yup.InferType<typeof schema>

export const ProfileMailForm: FC<ProfileMailFormProps> = ({
  email,
  profileId,
  onSuccess,
}) => {
  const { t } = useTranslation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: yupResolver(schema),
  })

  // create observation
  const { mutate } = useCreateModelMutation<
    Observation,
    ObservationCreateInput
  >('observations')

  type createOnservationProps = {
    subject: string
    content: string
  }
  const createObservation = async ({
    subject,
    content,
  }: createOnservationProps) => {
    const observationContent = `
      <p><strong>Email Sent To:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Content:</strong><br>${content}</p>
    `

    try {
      const body = {
        content: observationContent,
        profile: profileId,
      } as ObservationCreateInput

      mutate(body, { onSuccess: () => onSuccess?.() })
    } catch (error) {
      toastMessage(
        'Error',
        "Couldn't send observation. Please try again later.",
        'error',
      )
    }
  }

  // send email
  const { error, isPending, isSuccess, mutateAsync: sendEmail } = useSendEmail()

  const onSubmit = async (data: EmailFormValues) => {
    const content = data.content.replace(/\n/g, '<br>')
    const subject = data.subject

    try {
      const emailData: EmailCreateInput = {
        to: email,
        subject,
        html: content,
      }

      await sendEmail(emailData, {
        onSuccess: () => {
          createObservation({ subject, content })
          onSuccess?.()
        },
        onError: error => {
          toastMessage('Error', error.message, 'error')
        },
      })
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
