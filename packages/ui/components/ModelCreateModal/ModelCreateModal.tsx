import { PropsWithChildren } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa6'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import type { StrapiModel } from '@fc/types'

import { ModelCreateForm, ModelCreateFormProps } from '../ModelCreateForm'

export const ModelCreateModal = <T extends StrapiModel>({
  fields,
  onSuccess,
  schema,
  endpoint,
  children,
  title,
  model,
  buttonProps,
  shouldPublish,
  initialValues,
}: PropsWithChildren<ModelCreateFormProps<T> & { title: string }>) => {
  const formDisclosure = useDisclosure()

  const { canCreate } = useAuthContext()

  const handleSuccess = () => {
    formDisclosure.onClose()
    onSuccess?.()
  }

  const hasPermission = canCreate(endpoint)

  // when i check code (ie. TopicCard.tsx), i notice we hide this component if canCreate is false.
  // it is redundant we check permission both place. for better readability, i return null here and remove other checking.

  if (!hasPermission) return null

  return (
    <>
      <Button
        leftIcon={<FaPlus />}
        onClick={formDisclosure.onOpen}
        disabled={!hasPermission}
        {...buttonProps}
      >
        {children}
      </Button>

      <Modal
        placement={'center'}
        closeOnInteractOutside={true}
        open={formDisclosure.open}
        onOpenChange={formDisclosure.onToggle}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'primary.500'}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" py={6}>
            <ModelCreateForm<T>
              endpoint={endpoint}
              schema={schema}
              fields={fields}
              model={model}
              shouldPublish={shouldPublish}
              onSuccess={handleSuccess}
              initialValues={initialValues}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
