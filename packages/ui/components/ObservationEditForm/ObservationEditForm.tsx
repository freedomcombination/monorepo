import { useState } from 'react'

import { Group, HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdClose, MdOutlineCheck } from 'react-icons/md'
import { useBoolean } from 'react-use'
import { InferType } from 'yup'

import { useDeleteModelMutation } from '@fc/services/common/deleteModel'
import { useUpdateModelMutation } from '@fc/services/common/updateModel'
import type { Observation, ObservationUpdateInput, Profile } from '@fc/types'

import { observationSchema } from './schema'
import { ActionButton } from '../ActionButton'
import { ActionStack } from '../ActionStack'
import { FormItem } from '../FormItem'
import { WConfirm, WConfirmProps } from '../WConfirm'

type ObservationEditFormProps = Pick<Observation, 'content'> & {
  onSuccess?: () => void
  id: number
  createdAt: string
  creator: Profile
  onCancel?: () => void
}

export const ObservationEditForm = ({
  id,
  content,
  createdAt,
  creator,
  onSuccess,
}: ObservationEditFormProps) => {
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const [isEditing, setIsEditing] = useBoolean(false)
  const createdDate = format(createdAt, 'dd-MM-yyyy HH:mm')

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
    setIsEditing(false)
    setConfirmState(undefined)
  }

  const deleteMutation = useDeleteModelMutation<Observation>('observations')
  const updateMutation = useUpdateModelMutation<
    Observation,
    ObservationUpdateInput
  >('observations')

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

  const onSave = async (data: Pick<ObservationUpdateInput, 'content'>) => {
    const body = {
      content: data.content,
    }
    updateMutation.mutate({ id, ...body }, { onSuccess: handleSuccess })
  }
  const onCancel = () => {
    resetForm()
    setIsEditing(false)
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
      <Stack
        as="form"
        onSubmit={handleSubmit(onSave)}
        pos="relative"
        p={2}
        borderWidth={1}
        rounded={'md'}
      >
        <Group wrap={'wrap'} justify={'space-between'}>
          <HStack>
            <Text fontWeight={600} fontSize={'sm'}>
              {creator?.name}
            </Text>
            <Text fontSize={'sm'}>{createdDate}</Text>
          </HStack>
          <ActionStack canUpdate={'observations'} justifyContent={'flex-end'}>
            <Group>
              <ActionButton
                isVisible={!isEditing}
                onClick={() => setIsEditing(true)}
                leftIcon={<AiOutlineEdit />}
                variant={'outline'}
                size={'sm'}
              />
              <ActionButton
                isVisible={isEditing}
                onClick={onCancel}
                leftIcon={<MdClose />}
                colorPalette={'gray'}
                variant={'outline'}
                size={'sm'}
              />
              <ActionButton
                isVisible={isEditing}
                type="submit"
                leftIcon={<MdOutlineCheck />}
                variant={'outline'}
                size={'sm'}
              />
              {!isEditing && (
                <ActionButton
                  canDelete={'observations'}
                  onClick={onDelete}
                  leftIcon={<BsTrash />}
                  colorPalette="red"
                  variant={'outline'}
                  size={'sm'}
                />
              )}
            </Group>
          </ActionStack>
        </Group>

        <Stack h={'full'}>
          {isEditing ? (
            <FormItem
              as={Textarea}
              name={'content'}
              type={'textarea'}
              hideLabel
              required
              errors={errors}
              register={register}
              disabled={!isEditing}
              _disabled={disabledStyle}
            />
          ) : (
            <Text dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </Stack>
      </Stack>
    </>
  )
}
