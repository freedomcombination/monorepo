import { FC } from 'react'

import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { CourseApplicationCreateInput } from '@fc/types'

import { applicationSchema } from './schema'
import { ApplicationFormFields } from './types'
import { useCourseContext } from './useCourseContext'
import { FormItem } from '../FormItem'

export const CourseApplicationForm: FC = () => {
  const { t } = useTranslation()
  // const [termsAccepted, setTermsAccepted] = useState(false)
  // const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const { course, refetchApplicants } = useCourseContext()
  const { user, profile, token } = useAuthContext()
  const toast = useToast()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ApplicationFormFields>({
    resolver: yupResolver(applicationSchema()),
    mode: 'all',
  })

  const { mutate } = useMutation({
    mutationKey: ['course-apply'],
    mutationFn: (data: CourseApplicationCreateInput) =>
      Mutation.post('course-applications', data, token as string),
  })

  if (!profile || !user) return null

  const onSubmit = (data: ApplicationFormFields) => {
    mutate(
      {
        ...data,
        course: course.id,
        profile: profile.id,
        name: profile.name || user.username,
        email: profile.email || user.email,
      },
      {
        onSuccess: () => {
          reset()

          toast({
            title: 'Success',
            description: 'Your application has been submitted',
            status: 'success',
          })
        },
        onSettled: () => {
          refetchApplicants()
        },
      },
    )
  }

  // const valid = isValid && termsAccepted && privacyAccepted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
          <FormItem
            name="country"
            autoComplete="country"
            defaultValue={profile.country || ''}
            register={register}
            errors={errors}
          />

          <FormItem
            name="city"
            autoComplete="city"
            register={register}
            errors={errors}
          />
          <FormItem
            name="phone"
            autoComplete="phone"
            defaultValue={profile.phone || ''}
            register={register}
            errors={errors}
          />

          <Box gridColumn={{ lg: 'span 2' }}>
            <FormItem
              as={Textarea}
              name="message"
              register={register}
              errors={errors}
              label={t('motivation') as string}
            />
          </Box>
        </SimpleGrid>

        {/* <Stack spacing={2}>
          <Checkbox
            fontSize={'14px'}
            fontWeight={'400'}
            lineHeight={'20px'}
            onChange={e => setTermsAccepted(e.target.checked)}
          >
            <Trans
              i18nKey="apply-form.terms"
              components={{ a: <Link href={'/'} color="primary.500" /> }}
            />
          </Checkbox>
          <Checkbox
            fontSize={'14px'}
            fontWeight={'400'}
            lineHeight={'20px'}
            onChange={e => setPrivacyAccepted(e.target.checked)}
          >
            <Trans
              i18nKey="apply-form.agreement"
              components={{ a: <Link href={'/'} color="primary.500" /> }}
            />
          </Checkbox>
        </Stack> */}
        <Text fontSize={'14px'} w={'100%'} textAlign={'center'}>
          {profile.name || user.username} ({profile.email || user.email})
        </Text>
        <Button w={'100%'} type="submit" isDisabled={!isValid}>
          {t('apply-now')}
        </Button>
      </Stack>
    </form>
  )
}
