import { FC } from 'react'

import { Center } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

import { Alert, toaster } from '@fc/chakra'
import { RecaptchaKeys } from '@fc/config/constants'
import { mutation } from '@fc/services/common/mutation'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'
import { Profile, ProfileCreateInput } from '@fc/types'

import { JoinFormProvider } from './JoinFormProvider'
import { JoinFormFieldValues, JoinTemplateProps } from './types'
import { Container } from '../Container'
import { PageTitle } from '../PageTitle'

const JoinForm = dynamic(() => import('./JoinForm'), { ssr: false })

export const JoinTemplate: FC<JoinTemplateProps> = ({
  title,
  foundationInfo,
  jobs,
  defaultJobs = [],
}) => {
  const { t } = useTranslation()

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.JOIN_FORM)

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['create-volunteer'],
    mutationFn: (body: ProfileCreateInput) =>
      mutation<Profile, ProfileCreateInput>({
        endpoint: 'profiles',
        method: 'post',
        body: {
          ...body,
          isVolunteer: true,
          recaptchaToken: recaptchaToken ?? 'fake token',
          // now we make sure recaptchaToken is not undefined
          // and backend ll check if recaptchaToken exists then checks it
        },
        token: '',
      }),
  })

  const onSubmit = (data: JoinFormFieldValues) => {
    try {
      const { availableHours = 0 } = data

      const heardFrom = data.heardFrom.join(', ')
      const jobs = data.jobs

      const body: ProfileCreateInput = {
        ...data,
        availableHours,
        heardFrom,
        jobs,
        isVolunteer: true,
      }

      mutate(body, {
        onError: errCode => {
          toaster.create({
            title: t('apply-form.error.title'),
            description: errCode
              ? t(errCode as any)
              : t('apply-form.error.description'),
            type: 'error',
          })
        },
      })
    } catch (error) {
      console.error('Submit volunteer form error', error)
    }
  }

  return (
    <JoinFormProvider
      defaultJobs={defaultJobs}
      onSubmitHandler={onSubmit}
      isLoading={isPending}
      jobs={jobs}
      foundationInfo={foundationInfo}
    >
      <Container maxW={'4xl'}>
        {isSuccess ? (
          <Center h="calc(70vh)">
            <Alert
              status="success"
              colorScheme="primary"
              variant="solid"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              py={16}
              w="container.sm"
              shadow="base"
              rounded="lg"
              title={t('thank-you')}
            >
              {t('apply-form.thanks.description')}
            </Alert>
          </Center>
        ) : (
          <>
            <PageTitle>{title}</PageTitle>

            <JoinForm />
          </>
        )}
      </Container>
    </JoinFormProvider>
  )
}
