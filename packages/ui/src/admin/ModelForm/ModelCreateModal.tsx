import { PropsWithChildren } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { StrapiModel } from '@fc/types'

import { ModelCreateForm } from './ModelCreateForm'
import { ModelCreateFormProps } from './types'

export const ModelCreateModal = <T extends StrapiModel>({
  fields,
  onSuccess,
  schema,
  endpoint,
  children,
  title,
  model,
  buttonProps,
  hideLanguageSwitcher,
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
        isDisabled={!hasPermission}
        {...buttonProps}
      >
        {children}
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={formDisclosure.isOpen}
        onClose={formDisclosure.onClose}
        size="6xl"
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
              hideLanguageSwitcher={hideLanguageSwitcher}
              initialValues={initialValues}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
