import { FC } from 'react'

import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaEye } from 'react-icons/fa6'

import { useJoinFormContext } from './useJoinFormContext'

type FieldBoxProps = {
  field: string
  value: any
}

const FieldBox: FC<FieldBoxProps> = ({ field, value }) => {
  const { t } = useTranslation()

  if (!value || !field) return null

  return (
    <Tr rounded="lg" p={4}>
      <Th fontWeight="bold">
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </Th>
      <Td w="full">
        {Array.isArray(value) ? value.join(', ') : value || t('not-provided')}
      </Td>
    </Tr>
  )
}

export const PreviewVolunteerForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { locale } = useRouter()
  const { t } = useTranslation()

  const { watch, selectedJobs } = useJoinFormContext()

  const formData = watch()

  return (
    <>
      <Button onClick={onOpen} colorScheme={'green'} leftIcon={<FaEye />}>
        {t('preview')}
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={'2xl'}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalHeader color={'primary.500'}>
            <Heading as="h3" textTransform={'capitalize'}>
              {t('volunteer-form-preview')}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pos={'relative'} p={4}>
            <Table>
              <Tbody>
                <FieldBox
                  field="jobs"
                  value={selectedJobs.map(job => job[`name_${locale}`])}
                />
                <FieldBox field="cv" value={formData.cv?.name} />
                {Object.entries(
                  omit(formData, [
                    'jobs',
                    'cv',
                    'foundationConfirmation',
                    'jobInfoConfirmation',
                  ]),
                ).map(([key, value]) => (
                  <FieldBox field={key} key={key} value={value} />
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
