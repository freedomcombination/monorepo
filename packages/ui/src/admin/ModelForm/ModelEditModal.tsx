import {
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { StrapiModel } from '@fc/types'

import { ModelEditForm } from './ModelEditForm'
import { ModelEditModalProps } from './types'
import { DevPermissionPopup } from '../PermissionCard/DevPermissionPopup'

export const ModelEditModal = <T extends StrapiModel>({
  endpoint,
  title,
  hideLanguageSwitcher,
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
  const { data, isLoading, refetch } = useStrapiRequest<T>({ endpoint, id })

  const model = data?.data
  const handleSuccess = () => {
    onSuccess?.()
    refetch()
  }

  return (
    <Modal
      isCentered
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
        overflow={'hidden'}
        {...(isFullHeight && { h: 'full' })}
      >
        <ModalHeader color={'primary.500'}>
          {title}
          <DevPermissionPopup />
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
              hideLanguageSwitcher={hideLanguageSwitcher}
              onClose={onClose}
            />
            {children && (
              <>
                <Divider />
                {children}
              </>
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}
