import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Divider,
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

import { contactSchema } from './schema'
import { ContactFormFieldValues, ContactFormProps } from './types'
import { FormItem } from '../FormItem'

export const ContactForm: FC<ContactFormProps> = ({
  onSubmitHandler,
  isLoading,
  isSuccess,
  isError,
  errorMessage,
}) => {
  const { t } = useTranslation()

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
    <Stack rounded="lg" p={{ base: 8, lg: 16 }} shadow="base" spacing={4}>
      <Stack>
        <Heading size="lg">{t('contact.title')}</Heading>
        <Text fontSize="sm">{t('contact.form.fill')}</Text>
      </Stack>
      <Divider />
      <VStack spacing={5} as="form" onSubmit={handleSubmit(onSubmit)}>
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
          variant="solid"
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
          size={'lg'}
          w="full"
        >
          {t('contact.form.button')}
        </Button>

        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertDescription>{t('contact.form.success')}</AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              <>{t('contact.form.failed')} </>
              {errorMessage ? errorMessage : ''}
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Stack>
  )
}
