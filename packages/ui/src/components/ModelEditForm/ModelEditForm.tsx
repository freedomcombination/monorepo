import { useState } from 'react'

import { useBoolean, useDisclosure } from '@chakra-ui/hooks'
import {
  AspectRatio,
  Box,
  Separator,
  Flex,
  Heading,
  Stack,
  Textarea,
  Group,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { upperFirst } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineCheck, HiPlus } from 'react-icons/hi'
import {
  MdClose,
  MdOutlineCheck,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'
import { InferType } from 'yup'

import { Field, Switch } from '@fc/chakra'
import {
  endpointsWithApprovalStatus,
  endpointsWithPublicationState,
} from '@fc/lib'
import {
  useApproveModel,
  useCreateModelMutation,
  useDeleteModel,
  usePublishModel,
  useStrapiRequest,
  useUnpublishModel,
  useUpdateModelMutation,
} from '@fc/services'
import {
  FormCommonFields,
  Profile,
  ProfileCreateInput,
  StrapiCollectionEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
  User,
} from '@fc/types'

import { ModelEditFormProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'
import { useFields, useSchema } from '../../hooks'
import { useDefaultValues } from '../../hooks/useDefaultValues'
import { ActionButton } from '../ActionButton'
import { ActionStack } from '../ActionStack'
import { ArtAddToCollectionModal } from '../ArtAddToCollectionCard'
import { DownloadCapsModal } from '../DownloadCapsModal'
import { FormItem } from '../FormItem'
import { MasonryGrid } from '../MasonryGrid'
import { MdFormItem } from '../MdFormItem'
import { ModelMedia } from '../ModelMedia'
import { ModelSelect, Option } from '../ModelSelect'
import { SendNotificationButton } from '../SendNotificationButton'
import { WConfirm, WConfirmProps } from '../WConfirm'

export const ModelEditForm = <T extends StrapiModel>({
  endpoint,
  model,
  translatedFields,
  onSuccess,
  onCancel: onCancelProp,
  onClose,
  noColumns,
  defaultIsEditing = false,
}: ModelEditFormProps<T>) => {
  const translatableModel = model as unknown as StrapiTranslatableModel

  const id = model.id
  const isPublished = !!translatableModel.publishedAt
  const [isEditing, setIsEditing] = useBoolean(defaultIsEditing)
  const [isChangingImage, setIsChangingImage] = useState<{
    [x: string]: boolean
  }>({
    image: false,
    caps: false,
    avatar: false,
    video: false,
  })
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const fieldsData = useFields<T>()
  const schemasData = useSchema()

  const fields = fieldsData[endpoint]!
  const schemas = schemasData[endpoint]!

  const artModalDisclosure = useDisclosure()

  const router = useRouter()
  const { t } = useTranslation()

  const updateModelMutation = useUpdateModelMutation(endpoint)
  const unpublishModelMutation = useUnpublishModel(endpoint)
  const publishModelMutation = usePublishModel(endpoint)
  const deleteModelMutation = useDeleteModel(endpoint)
  const approveModelMutation = useApproveModel(
    endpoint,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

  const defaultValues = useDefaultValues(model, fields)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    reset: resetForm,
  } = useForm<InferType<typeof schemas>>({
    resolver: yupResolver(schemas),
    mode: 'all',
    values: defaultValues,
  })

  const profileQuery = useStrapiRequest<Profile>({
    endpoint: 'profiles',
    filters: { user: { id: { $eq: id } } },
    queryOptions: { enabled: endpoint === 'users' },
  })

  const profileMutation = useCreateModelMutation<Profile, ProfileCreateInput>(
    'profiles',
  )

  const convertToYoutubeEmbedUrl = (videoUrl: string) => {
    if (!videoUrl) return ''

    if (!videoUrl.includes('youtube.com')) return videoUrl

    if (videoUrl.includes('embed')) return videoUrl

    const videoId = videoUrl.split('v=')[1]

    return `https://www.youtube.com/embed/${videoId}`
  }

  const getVideoUrl = () => {
    try {
      const urState = watch('videoUrl')

      if (!urState) return null

      const url = new URL(urState).href

      return convertToYoutubeEmbedUrl(url)
    } catch (error) {
      console.error('Get video URL error', error)

      return null
    }
  }

  const videoUrl = getVideoUrl()

  const handleSuccess = () => {
    onSuccess?.()
    setIsEditing.off()
    setIsChangingImage({
      image: false,
      caps: false,
      avatar: false,
      video: false,
    })
    setConfirmState(undefined)
  }

  const onSaveModel = async (
    data: Record<string, string | File | Option | Option[]>,
  ) => {
    const body = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || !fields.some(f => f.name === key)) {
        return acc
      }

      // TODO: Find a better way to handle updating multiple media files
      if (Array.isArray(value) && key !== 'images') {
        return {
          ...acc,
          [key]: value.map(v => v.value),
        }
      }

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
    }, {} as StrapiTranslatableUpdateInput)

    updateModelMutation.mutate({ id, ...body }, { onSuccess: handleSuccess })
  }

  const onCancel = () => {
    onCancelProp?.()
    resetForm()
    setIsEditing.off()
    setIsChangingImage({
      image: false,
      caps: false,
      avatar: false,
      video: false,
    })
    setConfirmState(undefined)
  }

  const onUnPublish = () => {
    setConfirmState({
      title: 'Unpublish model',
      description: `Are you sure you want to unpublish this collection ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        unpublishModelMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const onPublish = () => {
    setConfirmState({
      title: 'Publish Activity',
      description: `Are you sure you want to publish this model ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        publishModelMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Activity',
      description: 'Are you sure you want to delete this model?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteModelMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
        router.back()
      },
    })
  }

  const onApprove = () => {
    setConfirmState({
      title: 'Approve Activity',
      description: 'Are you sure you want to approve this model?',
      buttonText: 'Approve',
      onConfirm: async () => {
        approveModelMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
      },
    })
  }

  const onGenerateProfile = () => {
    const userModel = model as User

    profileMutation.mutate(
      {
        email: userModel.email,
        user: userModel.id,
        publishedAt: new Date().toISOString(),
        name: userModel.username,
        availableHours: 1,
        phone: '',
      },
      {
        onSuccess: () => {
          profileQuery.refetch()
        },
      },
    )
  }

  const onPostClick = () => {
    if (endpoint === 'hashtags') router.push(`/hashtags/${id}`)
    else router.push(`/archive-contents/${id}`)
  }

  const toggleChangingMedia = (field: FormCommonFields<T>) =>
    setIsChangingImage(prev => ({
      ...prev,
      [field.name]: isChangingImage[field.name as string] ? false : true,
    }))

  const profile = profileQuery.data?.data?.[0]

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
    pl: 0,
  }

  const showApproveButton =
    endpointsWithApprovalStatus.includes(endpoint) &&
    translatableModel.approvalStatus !== 'approved'

  const [title, message, roles, profiles] = watch([
    'title',
    'message',
    'roles',
    'profiles',
  ])

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack as="form" onSubmit={handleSubmit(onSaveModel)} h={'full'}>
        <Flex p={{ base: 4, lg: 8 }} shadow={'sm'} flex={1}>
          <MasonryGrid
            cols={noColumns ? [1] : [1, 1, 1, 2]}
            columnGap={8}
            rowGap={4}
          >
            {Object.values(fields || {})?.map((field, index) => {
              const label = t(field.name as keyof I18nNamespaces['common'])
              const errorMessage =
                errors[field.name]?.message &&
                upperFirst(errors[field.name]?.message as string)

              if (field.type === 'file') {
                return (
                  <Field
                    key={index}
                    required={field.required}
                    maxW={400}
                    label={label}
                    errorText={errors[field.name as string]?.message as string}
                  >
                    <ModelMedia
                      endpoint={endpoint}
                      isEditing={isEditing}
                      model={model}
                      name={field.name as string}
                      setValue={setValue}
                      isChangingMedia={isChangingImage[field.name as string]}
                      toggleChangingMedia={() => toggleChangingMedia(field)}
                    />
                  </Field>
                )
              }

              if (field.type === 'boolean') {
                return (
                  <Field
                    key={index}
                    required={field.required}
                    disabled={field.blockEdit}
                    label={label}
                    helperText={
                      isEditing && field.blockEdit && 'Blocked from editing'
                    }
                    errorText={errors[field.name as string]?.message as string}
                  >
                    <Switch
                      disabled={field.blockEdit}
                      colorPalette={'primary'}
                      size={'lg'}
                      checked={!!watch(field.name as string)}
                      onCheckedChange={e => {
                        setValue(field.name as string, e.checked)
                      }}
                    />
                  </Field>
                )
              }

              if (field.type === 'select') {
                return (
                  <ModelSelect<T>
                    key={index}
                    endpoint={field.endpoint as StrapiCollectionEndpoint}
                    populate={field.populate}
                    options={field.options}
                    multiple={field.multiple}
                    required={field.required}
                    name={field.name as string}
                    disabled={field.blockEdit || !isEditing}
                    errors={errors}
                    control={control}
                    _disabled={disabledStyle}
                    helperText={
                      (isEditing &&
                        field.blockEdit &&
                        'Blocked from editing') ||
                      undefined
                    }
                  />
                )
              }

              if (field.type === 'markdown') {
                return (
                  <Box key={index} maxH={550} overflowY={'auto'}>
                    <MdFormItem
                      name={field.name as string}
                      disabled={field.blockEdit || !isEditing}
                      required={field.required}
                      errors={errors}
                      control={control}
                      _disabled={disabledStyle}
                      helperText={
                        (isEditing &&
                          field.blockEdit &&
                          'Blocked from editing') ||
                        undefined
                      }
                    />
                  </Box>
                )
              }

              const inputType =
                field.type === 'date'
                  ? 'date'
                  : field.type === 'datetime-local'
                    ? 'datetime-local'
                    : 'text'

              return (
                <Stack key={index}>
                  <FormItem
                    {...(field.type === 'textarea' && { as: Textarea })}
                    name={field.name as string}
                    type={inputType}
                    required={field.required}
                    errors={errors}
                    register={register}
                    disabled={field.blockEdit || !isEditing}
                    _disabled={disabledStyle}
                    helperText={
                      (isEditing &&
                        field.blockEdit &&
                        'Blocked from editing') ||
                      undefined
                    }
                  />
                  {field.type === 'mediaUrl' && videoUrl && (
                    <AspectRatio ratio={16 / 9}>
                      <iframe src={videoUrl} title={label} />
                    </AspectRatio>
                  )}
                </Stack>
              )
            })}
          </MasonryGrid>
        </Flex>
        <Flex
          justify={'end'}
          px={{ base: 4, lg: 8 }}
          py={4}
          pos={'sticky'}
          bottom={0}
          bg={'white'}
        >
          <Group wrap={'wrap'}>
            <ActionButton
              data-testid="button-posts"
              isVisible={
                endpoint === 'hashtags' || endpoint === 'archive-contents'
              }
              checkActions={{ endpoint: 'posts', actions: ['createPosts'] }}
              onClick={onPostClick}
              leftIcon={<FaXTwitter />}
              fontSize="sm"
              colorPalette={'purple'}
              loading={approveModelMutation.isPending}
            >
              {t('posts')}
            </ActionButton>

            {endpoint === 'notifications' && (
              <SendNotificationButton
                title={title}
                message={message}
                roles={roles}
                profiles={profiles}
              />
            )}

            <ActionStack isVisible={endpoint === 'collections'} gap={0}>
              <ArtAddToCollectionModal
                collection={model as any}
                isOpen={artModalDisclosure.open}
                onClose={artModalDisclosure.onClose}
              />
              <ActionButton
                canUpdate="collections"
                onClick={artModalDisclosure.onOpen}
                leftIcon={<HiPlus />}
                fontSize="sm"
                colorPalette={'purple'}
                loading={approveModelMutation.isPending}
              >
                {t('collection.add-art')}
              </ActionButton>
            </ActionStack>

            {endpoint === 'hashtags' && <DownloadCapsModal id={id} />}

            <ActionButton
              canCreate="profiles"
              isVisible={!profile && endpoint === 'users'}
              onClick={onGenerateProfile}
              leftIcon={<BiUserPlus />}
              colorPalette="primary"
            >
              {t('profile.create')}
            </ActionButton>

            <ActionButton
              isVisible={showApproveButton}
              canApprove={endpoint}
              onClick={onApprove}
              leftIcon={<HiOutlineCheck />}
              fontSize="sm"
              colorPalette={'purple'}
              loading={approveModelMutation.isPending}
            >
              {t('approve')}
            </ActionButton>

            <ActionStack direction={'row'} canUpdate={endpoint}>
              <ActionButton
                isVisible={!isEditing}
                onClick={setIsEditing.on}
                leftIcon={<AiOutlineEdit />}
                fontSize="sm"
              >
                {t('edit')}
              </ActionButton>

              <ActionButton
                isVisible={isEditing}
                onClick={onCancel}
                leftIcon={<MdClose />}
                colorPalette={'gray'}
                fontSize="sm"
              >
                {t('cancel')}
              </ActionButton>

              <ActionButton
                isVisible={isEditing}
                type="submit"
                leftIcon={<MdOutlineCheck />}
                fontSize="sm"
              >
                {t('save')}
              </ActionButton>
            </ActionStack>

            <ActionButton
              checkActions={{ endpoint, actions: ['update'] }}
              isVisible={endpointsWithPublicationState.includes(endpoint)}
              onClick={isPublished ? onUnPublish : onPublish}
              colorPalette={isPublished ? 'yellow' : 'green'}
              fontSize="sm"
              leftIcon={
                isPublished ? (
                  <MdOutlineUnpublished />
                ) : (
                  <MdOutlinePublishedWithChanges />
                )
              }
            >
              {isPublished ? t('unpublish') : t('publish')}
            </ActionButton>

            <ActionButton
              canDelete={endpoint}
              onClick={onDelete}
              leftIcon={<BsTrash />}
              colorPalette="red"
            >
              {t('delete')}
            </ActionButton>

            <ActionButton
              isVisible={!!onClose}
              onClick={onClose}
              colorPalette="gray"
            >
              {t('dismiss')}
            </ActionButton>
          </Group>
        </Flex>
      </Stack>
      <Separator />

      <ActionStack isVisible={!!profile}>
        <Heading p={{ base: 4, lg: 8 }}>{t('profile')}</Heading>
        <ModelEditForm
          endpoint="profiles"
          model={profile!}
          onSuccess={profileQuery.refetch}
        />
      </ActionStack>
    </>
  )
}
