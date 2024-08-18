import { useState } from 'react'

import { useBoolean } from '@chakra-ui/hooks'
import {
  ButtonGroup,
  HStack,
  Stack,
  Text,
  Textarea,
  Group,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdClose, MdOutlineCheck } from 'react-icons/md'
import { InferType } from 'yup'

import { useDeleteModel, useUpdateModelMutation } from '@fc/services'
import { Observation, ObservationUpdateInput, Profile } from '@fc/types'

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
            <ButtonGroup size={'sm'} variant={'outline'}>
              <ActionButton
                isVisible={!isEditing}
                onClick={setIsEditing.on}
                leftIcon={<AiOutlineEdit />}
                iconSpacing={0}
              />
              <ActionButton
                isVisible={isEditing}
                onClick={onCancel}
                leftIcon={<MdClose />}
                colorScheme={'gray'}
                iconSpacing={0}
              />
              <ActionButton
                isVisible={isEditing}
                type="submit"
                leftIcon={<MdOutlineCheck />}
                iconSpacing={0}
              />
              {!isEditing && (
                <ActionButton
                  canDelete={'observations'}
                  onClick={onDelete}
                  leftIcon={<BsTrash />}
                  colorScheme="red"
                  iconSpacing={0}
                />
              )}
            </ButtonGroup>
          </ActionStack>
        </Group>

        <Stack h={'full'}>
          {isEditing ? (
            <FormItem
              as={Textarea}
              name={'content'}
              type={'textarea'}
              hideLabel
              isRequired={true}
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
