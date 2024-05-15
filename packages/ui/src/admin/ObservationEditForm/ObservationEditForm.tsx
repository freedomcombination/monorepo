import { useState } from 'react'

import { Stack, Textarea, useBoolean } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdClose, MdOutlineCheck } from 'react-icons/md'
import { InferType } from 'yup'

import { useDeleteModel, useUpdateModelMutation } from '@fc/services'
import { ObservationUpdateInput, Observation } from '@fc/types'

import { observationSchema } from './schema'
import {
  ActionButton,
  ActionHStack,
  FormItem,
  WConfirm,
  WConfirmProps,
} from '../../components'

export type ObservationEditFormProps = Pick<Observation, 'content'> & {
  onSuccess?: () => void
  id: number
  onCancel?: () => void
}

export const ObservationEditForm = ({
  id,
  content,
  onSuccess,
}: ObservationEditFormProps) => {
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const [isEditing, setIsEditing] = useBoolean(false)
  const { t } = useTranslation()

  const schema = observationSchema()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      content,
    },
  })
  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
    pl: 0,
  }

  const handleSuccess = () => {
    onSuccess?.()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  const deleteMutation = useDeleteModel('observations')
  const updateMutation = useUpdateModelMutation('observations')

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Observation',
      description: 'Are you sure you want to delete this observation?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
      },
    })
  }

  const onSave = async (data: ObservationUpdateInput) => {
    const body = {
      content: data.content,
    } satisfies ObservationUpdateInput
    updateMutation.mutate({ id, ...body }, { onSuccess: handleSuccess })
  }
  const onCancel = () => {
    resetForm()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack as="form" onSubmit={handleSubmit(onSave)} h={'full'}>
        <FormItem
          as={Textarea}
          name={'content'}
          type={'textarea'}
          isRequired={true}
          errors={errors}
          register={register}
          isDisabled={!isEditing}
          _disabled={disabledStyle}
        />
        <ActionHStack canUpdate={'observations'} justifyContent={'flex-end'}>
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
            colorScheme={'gray'}
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
          <ActionButton
            canDelete={'observations'}
            onClick={onDelete}
            leftIcon={<BsTrash />}
            colorScheme="red"
          >
            {t('delete')}
          </ActionButton>
        </ActionHStack>
      </Stack>
    </>
  )
}
