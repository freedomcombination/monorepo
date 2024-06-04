import React, { FC, useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Stack,
  AlertIcon,
  Alert,
  AlertDescription,
  Input,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { t } from 'i18next'
import { FiArrowRight } from 'react-icons/fi'

import { EMAIL_SENDER, PUBLIC_TOKEN } from '@fc/config'
import { sendEmail } from '@fc/services'
import { EmailCreateInput } from '@fc/types'

interface ProfileMailFormProps {
  email: string
}

export const ProfileMailForm: FC<ProfileMailFormProps> = ({ email }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    isError,
    isPending,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['profile'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, PUBLIC_TOKEN as string)
    },
  })

  const handleSubmit = async () => {
    try {
      const emailData = {
        to: email,
        from: EMAIL_SENDER,
        subject: title,
        text: content,
      }

      setErrorMessage('')
      setTitle('')
      setContent('')

      return sendForm(emailData)
    } catch (error) {
      setErrorMessage(error as string)
    }
  }

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Box>
          <Stack
            as="form"
            onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <VStack spacing={4} align="stretch">
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  placeholder={'email title'}
                  onChange={e => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="text" isRequired>
                <FormLabel>Email content</FormLabel>
                <Textarea
                  placeholder="email content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </FormControl>
              <Button
                display={{ base: 'none', sm: 'flex' }}
                alignSelf="flex-end"
                rightIcon={<FiArrowRight />}
                onClick={handleSubmit}
                isDisabled={!title || !content}
                isLoading={isPending}
              >
                Send
              </Button>
            </VStack>
          </Stack>
        </Box>
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
    </Box>
  )
}
