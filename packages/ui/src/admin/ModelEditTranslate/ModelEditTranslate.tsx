import { useState } from 'react'

import {
  Box,
  FormLabel,
  HStack,
  Stack,
  Text,
  Textarea,
  useBoolean,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineCheck } from 'react-icons/hi'
import { MdClose, MdOutlineCheck } from 'react-icons/md'
import { InferType } from 'yup'

import {
  useApproveModel,
  useStrapiRequest,
  useUpdateModelMutation,
} from '@fc/services'
import {
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
} from '@fc/types'

import { ModelEditTranslateProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'
import {
  ActionButton,
  ActionHStack,
  Flags,
  FormItem,
  MdFormItem,
  WConfirm,
  WConfirmProps,
} from '../../components'
import { useReferenceModel } from '../../hooks'
import { FormLocaleSwitcher } from '../FormLocaleSwitcher'
import { Option, useDefaultValues } from '../ModelForm'

export const ModelEditTranslate = <T extends StrapiTranslatableModel>({
  id,
  endpoint,
  translatedFields,
  fields,
  schema,
  children,
  onSuccess,
}: ModelEditTranslateProps<T>) => {
  const { t } = useTranslation('common')

  const { data, refetch } = useStrapiRequest<T>({ endpoint, id })

  const model = data?.data

  const referenceModel = useReferenceModel<T>(model)

  const isReferenceSelf = model?.locale === referenceModel?.locale

  const defaultValues = useDefaultValues(model, fields)

  const [isEditing, setIsEditing] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateModelMutation = useUpdateModelMutation(endpoint)
  const approveModelMutation = useApproveModel(
    endpoint,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: defaultValues,
  })

  const handleSuccess = () => {
    onSuccess?.()
    refetch()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  const onSaveModel = async (
    data: Record<string, string | File | Option | Option[]>,
  ) => {
    const body = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || !fields.some(f => f.name === key)) {
        return acc
      }

      if (Array.isArray(value)) {
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

    updateModelMutation.mutateAsync(
      { id, ...body },
      { onSuccess: handleSuccess },
    )
  }

  const onApprove = () => {
    setConfirmState({
      title: t('approve') as string,
      description: t('approve.prompt') as string,
      buttonText: t('approve') as string,
      onConfirm: async () => {
        approveModelMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
      },
    })
  }

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
    pl: 0,
  }

  const onCancel = () => {
    resetForm()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  if (!model) return null

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack as="form" onSubmit={handleSubmit(onSaveModel)}>
        <Stack p={8} spacing={8}>
          {(model?.localizations?.length || 0) > 0 && (
            <FormLocaleSwitcher model={model} />
          )}
          {fields.map((field, index) => {
            return (
              <Stack
                key={index}
                spacing={4}
                p={4}
                rounded={'md'}
                shadow={'md'}
                bg={'white'}
              >
                <FormLabel
                  htmlFor={`${model?.id}`}
                  textTransform={'capitalize'}
                  fontWeight={600}
                >
                  {t(field.name as keyof I18nNamespaces['common'])}
                </FormLabel>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                  {!isReferenceSelf && referenceModel && (
                    <HStack w={{ base: 'full', lg: '33%' }} align="baseline">
                      <Box as={Flags[referenceModel.locale]} />
                      <Text
                        whiteSpace={'pre-wrap'}
                        maxH={500}
                        overflowY={'auto'}
                      >
                        {
                          referenceModel[
                            field.name as 'title' | 'description' | 'content'
                          ]
                        }
                      </Text>
                    </HStack>
                  )}
                  <HStack
                    flex={1}
                    align="baseline"
                    w={{ base: 'full', lg: '33%' }}
                  >
                    <Box as={Flags[model?.locale]} />
                    {field.type === 'markdown' ? (
                      <MdFormItem
                        id={`${model?.id}`}
                        {...(!isEditing && { p: 0 })}
                        key={index}
                        name={field.name as string}
                        isDisabled={!isEditing}
                        isRequired={field.isRequired}
                        errors={errors}
                        control={control}
                        _disabled={disabledStyle}
                        minH={300}
                        hideLabel
                        whiteSpace={'pre-wrap'}
                      />
                    ) : (
                      <FormItem
                        id={`${model?.id}`}
                        {...(!isEditing && { p: 0 })}
                        {...(field?.type === 'textarea' && {
                          as: Textarea,
                          minH: 150,
                          rows: 5,
                        })}
                        minH={10}
                        key={index}
                        name={field?.name as string}
                        h={'full'}
                        type={'text'}
                        whiteSpace={'pre-wrap'}
                        errors={errors}
                        register={register}
                        isDisabled={!isEditing}
                        _disabled={disabledStyle}
                        hideLabel
                      />
                    )}
                  </HStack>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
        {/*  Button group  */}
        <Wrap
          alignSelf={'end'}
          justify={'end'}
          pos={'sticky'}
          bottom={0}
          p={8}
          w={'full'}
          bg={'white'}
        >
          <ActionButton
            isVisible={
              !isEditing &&
              model.approvalStatus !== 'approved' &&
              (isReferenceSelf || referenceModel?.approvalStatus === 'approved')
            }
            canApprove={endpoint}
            onClick={onApprove}
            leftIcon={<HiOutlineCheck />}
            fontSize="sm"
            colorScheme={'purple'}
            isLoading={approveModelMutation.isPending}
          >
            {t('approve')}
          </ActionButton>

          <ActionHStack
            canUpdate={endpoint}
          >
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
              type="submit"
              leftIcon={<MdOutlineCheck />}
              fontSize="sm"
            >
              {t('save')}
            </ActionButton>

            <ActionButton
              isVisible={isEditing}
              onClick={onCancel}
              leftIcon={<MdClose />}
              colorScheme={'gray'}
              fontSize="sm"
            >
              {t('cancel')}
            </ActionButton>

            {children}
          </ActionHStack>
        </Wrap>
      </Stack>
    </>
  )
}
