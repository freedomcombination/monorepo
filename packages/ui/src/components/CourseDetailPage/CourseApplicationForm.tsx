import { FC } from 'react'

import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

import { PUBLIC_TOKEN } from '@fc/config'
import { Mutation } from '@fc/lib'
import { CourseApplicationCreateInput } from '@fc/types'

import { applicationSchema } from './schema'
import {
  ApplicationFormFields,
  CourseApplicationFormProps,
} from '../CourseDetailPage/types'
import { FormItem } from '../FormItem'

export const CourseApplicationForm: FC<CourseApplicationFormProps> = ({
  courseId,
}) => {
  const { t } = useTranslation()
  // const [termsAccepted, setTermsAccepted] = useState(false)
  // const [privacyAccepted, setPrivacyAccepted] = useState(false)

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
      Mutation.post('course-applications', data, PUBLIC_TOKEN),
  })

  const onSubmit = (data: ApplicationFormFields) => {
    mutate(
      { ...data, course: courseId },
      {
        onSuccess: () => {
          reset()

          toast({
            title: 'Success',
            description: 'Your application has been submitted',
            status: 'success',
          })
        },
      },
    )
  }

  // const valid = isValid && termsAccepted && privacyAccepted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={8}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
          <FormItem name="name" register={register} errors={errors} hideLabel />
          <FormItem
            name="email"
            type="email"
            autoComplete="email"
            register={register}
            errors={errors}
            hideLabel
          />
          <FormItem
            name="country"
            autoComplete="country"
            register={register}
            errors={errors}
            hideLabel
          />

          <FormItem
            name="city"
            autoComplete="city"
            register={register}
            errors={errors}
            hideLabel
          />
          <FormItem
            name="phone"
            autoComplete="phone"
            register={register}
            errors={errors}
            hideLabel
          />

          <Box gridColumn={{ lg: 'span 2' }}>
            <FormItem
              as={Textarea}
              name="message"
              register={register}
              errors={errors}
              hideLabel
              label={t('motivation') as string}
            />
          </Box>
        </SimpleGrid>

        {/* <Stack gap={2}>
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
        <Button w={'100%'} type="submit" isDisabled={!isValid}>
          {t('apply-now')}
        </Button>
      </Stack>
    </form>
  )
}
