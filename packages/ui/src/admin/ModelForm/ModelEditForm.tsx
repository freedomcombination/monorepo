import { useState } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Textarea,
  useBoolean,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineCheck, HiPlus } from 'react-icons/hi'
import {
  MdClose,
  MdOutlineCheck,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'
import { InferType } from 'yup'

import {
  useApproveModel,
  useCreateModelMutation,
  useDeleteModel,
  usePublishModel,
  useStrapiRequest,
  useUnpublishModel,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import {
  Profile,
  ProfileCreateInput,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
  User,
} from '@wsvvrijheid/types'

import { ModelMedia } from './ModelMedia'
import { ModelSelect } from './ModelSelect'
import { FormCommonFields, ModelEditFormProps, Option } from './types'
import { useDefaultValues } from './utils'
import { I18nNamespaces } from '../../../@types/i18next'
import { FormItem, MasonryGrid, MdFormItem } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { useFields, useSchema } from '../../data'
import { usePermission } from '../../hooks'
import { ArtAddToCollectionModal } from '../ArtAddToCollectionCard'
import { DowloadCapsModal } from '../DowloadCapsModal'

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

  const { allowEndpointAction } = usePermission()

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

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack as="form" onSubmit={handleSubmit(onSaveModel)} h={'full'}>
        <Flex p={8} shadow={'sm'} flex={1}>
          <MasonryGrid
            cols={noColumns ? [1] : [1, 1, 1, 2]}
            columnGap={8}
            rowGap={4}
          >
            {Object.values(fields || {})?.map((field, index) => {
              const label = t(field.name as keyof I18nNamespaces['common'])

              if (
                field.type === 'file' &&
                (field.name === 'image' ||
                  field.name === 'avatar' ||
                  field.name === 'caps' ||
                  field.name === 'invoice' ||
                  field.name === 'images')
              ) {
                return (
                  <FormControl
                    key={index}
                    isRequired={field.isRequired}
                    maxW={400}
                  >
                    <FormLabel
                      fontWeight={600}
                      fontSize={'sm'}
                      textTransform={'capitalize'}
                    >
                      {label}
                    </FormLabel>
                    <ModelMedia
                      endpoint={endpoint}
                      isEditing={isEditing}
                      model={model}
                      name={field.name as string}
                      setValue={setValue}
                      isChangingMedia={isChangingImage[field.name as string]}
                      toggleChangingMedia={() => toggleChangingMedia(field)}
                    />
                    <FormErrorMessage>
                      {errors[field.name as string]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                )
              }

              if (field.type === 'boolean') {
                return (
                  <FormControl
                    key={index}
                    isRequired={field.isRequired}
                    isDisabled={field.blockEdit}
                  >
                    <FormLabel fontWeight={600} fontSize={'sm'}>
                      {label}
                    </FormLabel>
                    <Switch
                      disabled={field.blockEdit}
                      colorScheme={'primary'}
                      size={'lg'}
                      isDisabled={!isEditing}
                      isChecked={!!watch(field.name as string)}
                      onChange={e => {
                        setValue(field.name as string, e.target.checked)
                      }}
                    />

                    <FormHelperText color={'orange.400'}>
                      {isEditing && field.blockEdit && 'Blocked from editing'}
                    </FormHelperText>

                    <FormErrorMessage>
                      {errors[field.name as string]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                )
              }

              if (field.type === 'select') {
                return (
                  <ModelSelect<T>
                    key={index}
                    endpoint={field.endpoint}
                    isMulti={field.isMulti}
                    isRequired={field.isRequired}
                    name={field.name as string}
                    isDisabled={field.blockEdit || !isEditing}
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
                  <Box key={index} maxH={400} overflowY={'auto'}>
                    <MdFormItem
                      name={field.name as string}
                      isDisabled={field.blockEdit || !isEditing}
                      isRequired={field.isRequired}
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
                    isRequired={field.isRequired}
                    errors={errors}
                    register={register}
                    isDisabled={field.blockEdit || !isEditing}
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
                      <Box as="iframe" src={videoUrl} title={label} />
                    </AspectRatio>
                  )}
                </Stack>
              )
            })}
          </MasonryGrid>
        </Flex>
        <Flex
          justify={'end'}
          px={8}
          py={4}
          pos={'sticky'}
          bottom={0}
          bg={'white'}
        >
          <Wrap>
            {endpoint === 'collections' && (
              <>
                <ArtAddToCollectionModal
                  collection={model as any}
                  isOpen={artModalDisclosure.isOpen}
                  onClose={artModalDisclosure.onClose}
                />
                {allowEndpointAction('collections', 'update') && (
                  <Button
                    onClick={artModalDisclosure.onOpen}
                    leftIcon={<HiPlus />}
                    fontSize="sm"
                    colorScheme={'purple'}
                    isLoading={approveModelMutation.isPending}
                  >
                    {t('collection.add-art')}
                  </Button>
                )}
              </>
            )}
            {endpoint === 'hashtags' && <DowloadCapsModal id={id} />}
            {!profile &&
              endpoint === 'users' &&
              allowEndpointAction('profiles', 'create') && (
                <Button
                  onClick={onGenerateProfile}
                  leftIcon={<BiUserPlus />}
                  colorScheme="primary"
                >
                  {t('profile.create')}
                </Button>
              )}
            {translatableModel.approvalStatus &&
              translatableModel.approvalStatus !== 'approved' &&
              allowEndpointAction(endpoint, 'approve') && (
                <Button
                  onClick={onApprove}
                  leftIcon={<HiOutlineCheck />}
                  fontSize="sm"
                  colorScheme={'purple'}
                  isLoading={approveModelMutation.isPending}
                >
                  {t('approve')}
                </Button>
              )}
            {allowEndpointAction(endpoint, 'update') && (
              <HStack>
                {!isEditing && (
                  <Button
                    onClick={setIsEditing.on}
                    leftIcon={<AiOutlineEdit />}
                    fontSize="sm"
                  >
                    {t('edit')}
                  </Button>
                )}
                {isEditing && (
                  <Button
                    onClick={onCancel}
                    leftIcon={<MdClose />}
                    colorScheme={'gray'}
                    fontSize="sm"
                  >
                    {t('cancel')}
                  </Button>
                )}
                {isEditing && (
                  <Button
                    type="submit"
                    leftIcon={<MdOutlineCheck />}
                    fontSize="sm"
                  >
                    {t('save')}
                  </Button>
                )}
              </HStack>
            )}
            {allowEndpointAction(endpoint, 'publish') && (
              <Button
                onClick={isPublished ? onUnPublish : onPublish}
                colorScheme={isPublished ? 'yellow' : 'green'}
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
              </Button>
            )}
            {allowEndpointAction(endpoint, 'delete') && (
              <Button
                onClick={onDelete}
                leftIcon={<BsTrash />}
                colorScheme="red"
              >
                {t('delete')}
              </Button>
            )}
            {onClose && (
              <Button onClick={onClose} colorScheme="gray">
                {t('dismiss')}
              </Button>
            )}
          </Wrap>
        </Flex>
      </Stack>
      <Divider />
      {profile && (
        <>
          <Heading p={8}>{t('profile')}</Heading>
          <ModelEditForm
            endpoint="profiles"
            model={profile}
            onSuccess={profileQuery.refetch}
          />
        </>
      )}
    </>
  )
}
