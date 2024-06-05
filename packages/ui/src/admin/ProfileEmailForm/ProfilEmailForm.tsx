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

  const { error, isPending, isSuccess, mutateAsync: sendEmail } = useSendEmail()

  const onSubmit = async (data: EmailFormValues) => {
    const content = data.content
    const subject = data.subject

    try {
      const emailData: EmailCreateInput = {
        to: email,
        subject,
        text: content,
      }

      await sendEmail(emailData)
      reset()

      isSuccess && createObservation({ subject, content })
    } catch (error: any) {
      console.error(error)
    }
  }

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
    const observationContent = `email sended to: ${email} \n with subject: ${subject} \n and content: ${content}`

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
