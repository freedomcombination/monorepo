import { FC, useEffect } from 'react'

import {
  Box,
  chakra,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaCircleInfo } from 'react-icons/fa6'
import { setLocale } from 'yup'
import { tr, nl, en } from 'yup-locales'

import { sleep } from '@fc/utils'

import { heardFrom } from './data'
import { joinSchema } from './schema'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { Button } from '../Button'
import { FormItem } from '../FormItem'
import { Tooltip } from '../Tooltip'

export const JoinForm: FC<JoinFormProps> = ({
  onSubmitHandler,
  isLoading,
  platforms = [],
  foundationJobs = [],
}) => {
  const { t } = useTranslation()

  const { locale } = useRouter()

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    else if (locale === 'nl') setLocale(nl)
    else setLocale(en)

    const updateErrorFields = async () => {
      await sleep(100)
      Object.keys(errors).forEach(fieldName => {
        if (errors[fieldName as keyof JoinFormFieldValues]) {
          clearErrors(fieldName as keyof JoinFormFieldValues)
          trigger(fieldName as keyof JoinFormFieldValues)
        }
      })
    }
    updateErrorFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const onSubmit: SubmitHandler<JoinFormFieldValues> = data => {
    const newData = { ...data, jobs: data.jobs.map(Number) }
    onSubmitHandler(newData as any)
  }

  return (
    <Stack
      p={8}
      bg="white"
      rounded="lg"
      shadow="base"
      as="form"
      gap={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
        {t('apply-form.title')}
      </Heading>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
        <FormItem
          register={register}
          id="name"
          name="name"
          autoComplete="name"
          errors={errors}
          required
        />
        <FormItem
          name="email"
          id="email"
          autoComplete="email"
          register={register}
          errors={errors}
          required
        />
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
        <FormItem register={register} id="phone" name="phone" errors={errors} />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          errors={errors}
          required
        />
        <FormItem
          type="number"
          register={register}
          id="age"
          name="age"
          errors={errors}
          required
        />
      </Stack>
      <FormItem
        register={register}
        errors={errors}
        id="occupation"
        name="occupation"
      />
      <FormItem
        register={register}
        errors={errors}
        id="city"
        name="city"
        autoComplete="city"
        required
      />

      <FormItem
        as={Textarea}
        register={register}
        errors={errors}
        id="comment"
        name="comment"
      />

      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <Switch
          id="in-mailing-list"
          alignItems={'center'}
          display={'flex'}
          {...register('inMailingList')}
        >
          {t('apply-form.in-mailing-list')}
        </Switch>
        <Switch id="is-public" {...register('isPublic')}>
          {t('apply-form.show-in-website')}
        </Switch>
      </Stack>

      {/* heard FROM */}
      <Box>
        <FormLabel fontSize="sm" fontWeight={600}>
          {t('apply-form.heard-from')}
        </FormLabel>
        <Wrap
          p={4}
          gap={4}
          rounded="lg"
          borderWidth={2}
          borderColor={errors['heardFrom'] ? 'red.400' : 'gray.100'}
        >
          {heardFrom.map(item => (
            <Checkbox
              key={item.value}
              id={item.value}
              {...register(`heardFrom`)}
              value={item.value}
              textTransform="capitalize"
            >
              {item?.label[locale]}
            </Checkbox>
          ))}
        </Wrap>
        {errors['heardFrom'] && (
          <Text fontSize="sm" color="red.500">
            {errors.heardFrom.message}
          </Text>
        )}
      </Box>

      {/* JOBS */}
      <Box>
        <FormLabel fontSize="sm" fontWeight={600}>
          {t('jobs')}
          <chakra.span color="red.500">*</chakra.span>
        </FormLabel>
        <Stack
          gap={8}
          rounded="lg"
          p={4}
          borderWidth={2}
          borderColor={errors['jobs'] ? 'red.500' : 'gray.100'}
        >
          {foundationJobs.length > 0 && (
            <Stack>
              <Text fontWeight={600} fontSize="sm">
                Freedom Combination Foundation
              </Text>
              {foundationJobs?.map(job => (
                <HStack key={job.id} align={'center'}>
                  <Checkbox
                    key={job.id}
                    id={job.id.toString()}
                    {...register(`jobs`)}
                    value={job.id}
                    textTransform={'capitalize'}
                  >
                    {job[`name_${locale}`]}
                  </Checkbox>
                  {job[`description_${locale}`] && (
                    <Tooltip
                      placement="top-end"
                      bg={'white'}
                      color={'initial'}
                      borderWidth={1}
                      rounded={'md'}
                      label={job[`description_${locale}`] as string}
                      aria-label={job[`description_${locale}`] as string}
                    >
                      <Box>
                        <FaCircleInfo />
                      </Box>
                    </Tooltip>
                  )}
                </HStack>
              ))}
            </Stack>
          )}

          {platforms?.map((platform, i) => (
            <Stack key={i}>
              <Text fontWeight={600} fontSize="sm">
                {platform[`name_${locale}`]}
              </Text>
              {platform?.jobs?.map(job => (
                <Checkbox
                  key={job.id}
                  id={job.id.toString()}
                  {...register(`jobs`)}
                  value={job.id}
                  textTransform={'capitalize'}
                >
                  {job[`name_${locale}`]}
                </Checkbox>
              ))}
            </Stack>
          ))}

          {errors['jobs'] && (
            <Text fontSize="sm" color="red.500">
              {errors.jobs.message}
            </Text>
          )}
        </Stack>
      </Box>
      <Button isLoading={isLoading} size="lg" type="submit">
        {t('submit')}
      </Button>
    </Stack>
  )
}
