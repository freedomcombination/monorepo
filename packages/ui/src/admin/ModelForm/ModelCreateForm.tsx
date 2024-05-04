import { useEffect, useState } from 'react'

import { Box, Button, Divider, Stack, useBoolean } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { InferType } from 'yup'

import { useCreateModelMutation } from '@fc/services'
import {
  Course,
  Post,
  PostCreateInput,
  StrapiModel,
  StrapiTranslatableCreateInput,
} from '@fc/types'
import { generateOgImageParams } from '@fc/utils'

import { renderCreateFormBody } from './renderCreateFormBody'
import { ModelCreateFormProps, Option } from './types'
import { useDefaultValues } from './utils'
import { I18nNamespaces } from '../../../@types/i18next'
import { MasonryGrid } from '../../components'
import { useFileFromUrl } from '../../hooks'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { RadioCards } from '../RadioCards'

export const ModelCreateForm = <T extends StrapiModel>({
  endpoint,
  fields,
  schema,
  model,
  initialValues,
  onSuccess,
  hideLanguageSwitcher,
  shouldPublish,
}: ModelCreateFormProps<T>) => {
  const createModelMutation = useCreateModelMutation<
    T,
    StrapiTranslatableCreateInput
  >(endpoint)

  const { locale } = useRouter()
  const { t } = useTranslation()

  const postModel = model as unknown as Post
  const [isChangingImage, setIsChangingImage] = useBoolean(
    postModel?.image ? false : true,
  )

  const imageFile = useFileFromUrl(
    postModel?.image?.url,
    postModel?.image?.mime,
  )
  const capsFile = useFileFromUrl(postModel?.caps?.url, postModel?.caps?.mime)
  const videoFile = useFileFromUrl(
    postModel?.video?.url,
    postModel?.video?.mime,
  )

  const defaultValues = useDefaultValues(
    { ...initialValues, ...model } as T,
    fields,
  )

  const formProps = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: defaultValues,
  })
  const { handleSubmit, setValue } = formProps

  useEffect(() => {
    if (imageFile) {
      setValue('image', imageFile)
    }

    if (capsFile) {
      setValue('caps', capsFile)
    }

    if (videoFile) {
      setValue('video', videoFile)
    }
  }, [imageFile, capsFile, videoFile, setValue])

  const handleSuccess = () => {
    onSuccess?.()
    setValue('image', undefined)
  }
  const onCreateModel = async (
    data: Record<string, string | number | File | Option | Option[]>,
  ) => {
    const body = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || !fields.some(f => f.name === key)) {
        return acc
      }

      // Multiple select
      if (Array.isArray(value)) {
        return {
          ...acc,
          [key]: value.map(v => v.value),
        }
      }

      // Single select
      if ((value as Option).value) {
        return {
          ...acc,
          [key]: (value as Option).value,
        }
      }

      return {
        ...acc,
        [key]: value,
      }
    }, {} as StrapiTranslatableCreateInput)

    const title = body.title || (body as unknown as Course).title_en

    const slug = title && slugify(title)

    const bodyData = {
      ...body,
      slug,
      publishedAt: shouldPublish ? new Date() : null,
      locale,
    } as StrapiTranslatableCreateInput

    if (endpoint === 'posts') {
      const imageProps = generateOgImageParams()
      const postBody = bodyData as PostCreateInput
      postBody.imageParams = imageProps
    }

    createModelMutation.mutate(bodyData, {
      onSuccess: handleSuccess,
    })
  }

  const groupedFields = fields.filter(value => value.group)
  const ungroupedFields = fields.filter(value => !value.group)

  const options = groupedFields.map(field => {
    const value = field.group?.value as string
    const name = field.group?.name as keyof I18nNamespaces['common']
    const label = field.group?.label as string

    return {
      value,
      label: t(name, { defaultValue: label }),
    }
  })
  const [activeOption, setActiveOption] = useState(options[0]?.value)

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onCreateModel)}>
      <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
        {!hideLanguageSwitcher && (
          <Box mb={8}>
            <LanguageSwitcher />
          </Box>
        )}
        {renderCreateFormBody<T>({
          fields: ungroupedFields,
          formProps,
          isChangingMedia: isChangingImage,
          toggleChangingMedia: setIsChangingImage.toggle,
          t,
        })}

        {groupedFields?.length > 0 && (
          <>
            <Divider my={6} />
            <RadioCards
              defaultValue={groupedFields[0]?.group?.value}
              options={options as Option[]}
              setActiveOption={setActiveOption}
            />
            {renderCreateFormBody<T>({
              model,
              fields: groupedFields,
              formProps,
              activeOption,
              isChangingMedia: isChangingImage,
              toggleChangingMedia: setIsChangingImage.toggle,
              t,
            })}
          </>
        )}
      </MasonryGrid>
      <Button
        alignSelf={'end'}
        leftIcon={<TbPlus />}
        type={'submit'}
        isLoading={createModelMutation.isPending}
      >
        {t('create')}
      </Button>
    </Stack>
  )
}
