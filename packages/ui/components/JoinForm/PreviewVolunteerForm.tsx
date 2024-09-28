import { FC } from 'react'

import { Heading, Table, useDisclosure } from '@chakra-ui/react'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaEye } from 'react-icons/fa6'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'

import { useJoinFormContext } from './useJoinFormContext'

type FieldBoxProps = {
  field: string
  value: any
}

const FieldBox: FC<FieldBoxProps> = ({ field, value }) => {
  const { t } = useTranslation()

  if (!value || !field) return null

  return (
    <Table.Row rounded="lg" p={4}>
      <Table.Column fontWeight="bold">
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </Table.Column>
      <Table.Cell w="full">
        {Array.isArray(value) ? value.join(', ') : value || t('not-provided')}
      </Table.Cell>
    </Table.Row>
  )
}

export const PreviewVolunteerForm = () => {
  const { open, onClose, onOpen } = useDisclosure()

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
        centered
        open={open}
        onOpenChange={e => !e.open && onClose()}
        size={'xl'}
        scrollBehavior="inside"
        closeOnInteractOutside={false}
        closeOnEscape={false}
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
            <Table.Root>
              <Table.Body>
                <FieldBox
                  field="jobs"
                  value={selectedJobs.map(job => job[`name_${locale}`])}
                />
                <FieldBox field="cv" value={formData.cv?.name} />
                {Object.entries(omit(formData, ['jobs', 'cv'])).map(
                  ([key, value]) => (
                    <FieldBox field={key} key={key} value={value} />
                  ),
                )}
              </Table.Body>
            </Table.Root>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
