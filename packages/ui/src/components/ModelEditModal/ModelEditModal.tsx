import { Center, Heading, Spinner } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { StrapiModel } from '@fc/types'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/ui'

import { ModelEditModalProps } from './types'
import { ModelEditForm } from '../ModelEditForm'

export const ModelEditModal = <T extends StrapiModel>({
  endpoint,
  title,
  id,
  isFullHeight,
  isOpen,
  onClose,
  size = '6xl',
  maxW,
  onSuccess,
  children = null,
  ...rest
}: ModelEditModalProps<T>) => {
  const { token } = useAuthContext()

  const { data, isLoading, refetch } = useStrapiRequest<T>({
    endpoint,
    id,
    queryOptions: {
      enabled: isOpen && !!token,
    },
  })

  const model = data?.data
  const handleSuccess = () => {
    onSuccess?.()
    refetch()
  }

  return (
    <Modal
      centered
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        maxW={maxW}
        p={0}
        //  overflow={'hidden'}
        {...(isFullHeight && { h: 'full' })}
      >
        <ModalHeader color={'primary.500'}>
          <Heading as="h3">{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {model && (
          <ModalBody pos="relative" p={0}>
            <ModelEditForm<T>
              endpoint={endpoint}
              model={model}
              onSuccess={handleSuccess}
              onClose={onClose}
            />
            {children}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}
