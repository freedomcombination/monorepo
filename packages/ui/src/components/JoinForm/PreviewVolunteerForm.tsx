import { FC, useState } from 'react'

import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Job } from '@fc/types'

import { JoinFormFieldValues } from './types'
import { ModelModal } from '../ModelModal'

export type PreviewVolunteerFormProps = {
  getData: () => JoinFormFieldValues
}
export const PreviewVolunteerForm: FC<PreviewVolunteerFormProps> = ({
  getData,
}) => {
  const { locale } = useRouter()
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [modalTitle, setModalTitle] = useState<string>('')

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setModalTitle('Volunteer Form Preview')
    setIsOpen(true)
    const selectedFields = getData() || {}

    const fields = Object.entries(selectedFields as JoinFormFieldValues).map(
      ([key, value]) => {
        if (key === 'jobs') {
          return (
            <HStack
              key={key}
              align="start"
              borderWidth={2}
              rounded="lg"
              p={4}
              borderColor="gray.100"
            >
              <Text fontWeight="bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              {Array.isArray(value) && value.length > 0 ? (
                value.map((job: Job) => (
                  <Text key={job?.id}>{job[`name_${locale}`]}</Text>
                ))
              ) : (
                <Text>Not provided</Text>
              )}
            </HStack>
          )
        }

        if (key === 'cv') {
          const { name } = value as File

          return (
            <HStack
              key={key}
              align="start"
              borderWidth={2}
              rounded="lg"
              p={4}
              borderColor="gray.100"
            >
              <Text fontWeight="bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              <Text>{name ? name : 'Not provided'}</Text>
            </HStack>
          )
        }

        return (
          <HStack
            key={key}
            align="start"
            borderWidth={2}
            rounded="lg"
            p={4}
            borderColor="gray.100"
          >
            <Text fontWeight="bold">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <Text>
              {typeof value === 'object'
                ? JSON.stringify(value)
                : value
                  ? value
                  : 'Not provided'}
            </Text>
          </HStack>
        )
      },
    )

    setModalContent(
      <Box p={5} borderRadius="md" shadow="md">
        <VStack spacing={4} align="stretch">
          {fields}
        </VStack>
      </Box>,
    )
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={openModal} variant="solid">
        Preview
      </Button>
      <ModelModal title={modalTitle} isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </ModelModal>
    </>
  )
}
