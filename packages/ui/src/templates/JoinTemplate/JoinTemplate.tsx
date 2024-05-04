import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaRegFilePdf } from 'react-icons/fa6'

import { PUBLIC_TOKEN } from '@fc/config'
import { Mutation } from '@fc/lib'
import { useStrapiRequest } from '@fc/services'
import { Platform, Profile, ProfileCreateInput } from '@fc/types'
import { toastMessage } from '@fc/utils'

import { JoinTemplateProps } from './types'
import {
  Container,
  JoinForm,
  JoinFormFieldValues,
  PageTitle,
  PlatformList,
} from '../../components'

export const JoinTemplate: FC<JoinTemplateProps> = ({ title }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const platformsResult = useStrapiRequest<Platform>({
    endpoint: 'platforms',
    locale,
  })

  const platforms = platformsResult.data?.data || []

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['create-volunteer'],
    mutationFn: (body: ProfileCreateInput) =>
      Mutation.post<Profile, ProfileCreateInput>(
        'profiles',
        { ...body, isVolunteer: true },
        PUBLIC_TOKEN as string,
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
        onError: () =>
          toastMessage(t`error`, t`apply-form.error.description`, 'error'),
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
          >
            <VStack spacing={4}>
              <AlertIcon boxSize="60px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="2xl">
                {t('thank-you')}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {t('apply-form.thanks.description')}
              </AlertDescription>
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
            <Stack spacing={4}>
              <Alert rounded="md">
                <Link
                  lineHeight={1}
                  href="/fc-vrijwilligersovereenkomst.pdf"
                  download
                  fontWeight={500}
                  _hover={{ textDecoration: 'underline', color: 'primary.500' }}
                >
                  <HStack as="span" display={'inline-flex'} align={'center'}>
                    <AlertIcon color={'inherit'} m={0} as={FaRegFilePdf} />
                    <span>{t('download-volunteer-form')}</span>
                  </HStack>
                </Link>
              </Alert>
              <JoinForm
                onSubmitHandler={onSubmit}
                isLoading={isPending}
                platforms={platforms}
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
