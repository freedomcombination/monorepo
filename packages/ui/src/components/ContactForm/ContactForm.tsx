import {
  Separator,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsPerson } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

import { Button, Alert } from '@fc/chakra'
import { EMAIL } from '@fc/config'
import { useSendEmail } from '@fc/services'

import { contactSchema } from './schema'
import { ContactFormFieldValues } from './types'
import { FormItem } from '../FormItem'

export const ContactForm = () => {
  const { t } = useTranslation()

  const { isError, isPending, isSuccess, mutate: sendForm } = useSendEmail()

  const onSubmitHandler = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Contact from ${data.fullname} (${data.email})`,
      text: data.message,
      from: EMAIL,
      to: EMAIL,
    }

    return sendForm(emailData)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormFieldValues>({
    resolver: yupResolver(contactSchema),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ContactFormFieldValues> = async data => {
    await onSubmitHandler(data)
    reset()
  }

  return (
    <Stack rounded="lg" p={{ base: 8, lg: 16 }} shadow="base" gap={4}>
      <Stack>
        <Heading size="lg">{t('contact.title')}</Heading>
        <Text fontSize="sm">{t('contact.form.fill')}</Text>
      </Stack>
      <Separator />
      <VStack gap={5} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          name="fullname"
          autoComplete="name"
          leftElement={<BsPerson color="gray.800" />}
          errors={errors}
          register={register}
        />
        <FormItem
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          leftElement={<MdEmail color="gray.200" />}
          errors={errors}
          register={register}
        />
        <FormItem
          as={Textarea}
          name="message"
          label={t('contact.form.message') as string}
          errors={errors}
          register={register}
        />

        <Button
          data-testid="submit-send-message"
          variant="solid"
          type="submit"
          disabled={!isValid}
          loading={isPending}
          size={'lg'}
          w="full"
        >
          {t('contact.form.button')}
        </Button>

        {isSuccess && (
          <Alert data-testid="success-contact-form" status="success">
            {t('contact.form.success')}
          </Alert>
        )}
        {isError && (
          <Alert status="error">
            <>{t('contact.form.failed')} </>
          </Alert>
        )}
      </VStack>
    </Stack>
  )
}
