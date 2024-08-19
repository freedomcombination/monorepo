import { FC } from 'react'

import {
  Box,
  Center,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaRegFilePdf } from 'react-icons/fa6'

import { Alert, toaster } from '@fc/chakra'
import { RecaptchaKeys } from '@fc/config'
import { Mutation } from '@fc/lib'
import { useRecaptchaToken, useStrapiRequest } from '@fc/services'
import { Job, Platform, Profile, ProfileCreateInput } from '@fc/types'

import { JoinTemplateProps } from './types'
import { Container } from '../Container'
import { JoinForm, JoinFormFieldValues } from '../JoinForm'
import { PageTitle } from '../PageTitle'
import { PlatformList } from '../PlatformList'

export const JoinTemplate: FC<JoinTemplateProps> = ({ title }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const platformsResult = useStrapiRequest<Platform>({
    endpoint: 'platforms',
    locale,
  })

  const platforms = platformsResult.data?.data || []

  // Fetch foundation jobs
  const foundationJobsResult = useStrapiRequest<Job>({
    endpoint: 'jobs',
    locale,
    filters: { platform: { $null: true } },
  })

  const foundationJobs = foundationJobsResult.data?.data || []

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.JOIN_FORM)

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['create-volunteer'],
    mutationFn: (body: ProfileCreateInput) =>
      Mutation.post<Profile, ProfileCreateInput>(
        'profiles',
        {
          ...body,
          isVolunteer: true,
          recaptchaToken: recaptchaToken ?? 'fake token',
          // now we make sure recaptchaToken is not undefined
          // and backend ll check if recaptchaToken exists then checks it
        },
        '',
      ),
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
    <Container>
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
            <VStack gap={4}>
              <Box maxWidth="sm">{t('apply-form.thanks.description')}</Box>
            </VStack>
          </Alert>
        </Center>
      ) : (
        <>
          <PageTitle>{title}</PageTitle>

          <SimpleGrid
            mb={8}
            gap={8}
            columns={{ base: 1, lg: 2 }}
            alignItems="start"
          >
            <Stack gap={4}>
              <Alert rounded="md">
                <Link
                  lineHeight={1}
                  href="/fc-vrijwilligersovereenkomst.pdf"
                  download
                  fontWeight={500}
                  _hover={{ textDecoration: 'underline', color: 'primary.500' }}
                >
                  <HStack as="span" display={'inline-flex'} align={'center'}>
                    <Icon color={'inherit'} m={0} as={FaRegFilePdf} />
                    <span>{t('download-volunteer-form')}</span>
                  </HStack>
                </Link>
              </Alert>
              <JoinForm
                onSubmitHandler={onSubmit}
                loading={isPending}
                platforms={platforms}
                foundationJobs={foundationJobs}
              />
            </Stack>

            <Box pos="sticky" top={8}>
              {platforms && <PlatformList platforms={platforms} />}
            </Box>
          </SimpleGrid>
        </>
      )}
    </Container>
  )
}
