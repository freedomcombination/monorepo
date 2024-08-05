import { FC, useState } from 'react'

import {
  Badge,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Art, StrapiLocale } from '@fc/types'

import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtApprovalTypes } from './types'
import { ArtCardImage } from '../ArtCardImage'
import { Button } from '../Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '../Modal'
import { ModelEditForm } from '../ModelEditForm'
import { Tag, TagLabel } from '../Tag'
import { WAvatar } from '../WAvatar'

export const ArtApprovalModal: FC<ArtApprovalTypes> = ({
  art,
  artist,
  isOpen,
  onClose,
  onSuccess,
  editor,
}) => {
  const { locale } = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useTranslation()

  const [language, setLanguage] = useState<StrapiLocale>(locale)

  const titleKey = `title_${language}` as const
  const descriptionKey = `description_${language}` as const

  const title = art[titleKey]
  const description = art[descriptionKey]

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" centered>
        <ModalOverlay />
        <ModalContent maxW="95vw" p={0} overflow="hidden">
          <ModalCloseButton />
          <ModalBody h={'inherit'} maxH={'80vh'} p={0}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} h="inherit">
              <ArtCardImage art={art} />
              {!isEditing && (
                <Stack overflowY={'auto'}>
                  <Stack gap={4} p={{ base: 4, lg: 8 }} flex={1}>
                    <HStack>
                      {['en', 'nl', 'tr'].map(lang => (
                        <Button
                          key={lang}
                          textTransform={'uppercase'}
                          variant={language === lang ? 'solid' : 'outline'}
                          onClick={() => setLanguage(lang as StrapiLocale)}
                        >
                          {lang}
                        </Button>
                      ))}
                    </HStack>
                    <HStack gap={4}>
                      <Heading flex={1} color={'primary.500'} fontWeight={700}>
                        {title}
                      </Heading>
                      <Tag
                        flexShrink={0}
                        size={'lg'}
                        colorPalette={
                          art.approvalStatus === 'approved'
                            ? 'green'
                            : art.approvalStatus === 'rejected'
                              ? 'red'
                              : 'yellow'
                        }
                      >
                        <TagLabel>
                          {art.approvalStatus === 'approved'
                            ? 'Approved'
                            : art.approvalStatus === 'rejected'
                              ? 'Rejected'
                              : 'Pending'}
                        </TagLabel>
                      </Tag>
                    </HStack>

                    <HStack gap={3} w={'full'}>
                      <WAvatar
                        size="md"
                        src={artist?.avatar?.url}
                        name={artist?.name || artist?.email || 'Unknown'}
                      />
                      <Box>
                        <Text fontWeight={700}>
                          {artist?.name || 'Unknown'}
                        </Text>
                        <Text>{artist?.email}</Text>
                      </Box>
                    </HStack>

                    <Stack>
                      <Text color={'black'} fontWeight={700}>
                        {t('categories')}
                      </Text>
                      <Wrap>
                        {art?.categories?.map(category => (
                          <Badge
                            py={1}
                            px={2}
                            rounded={'md'}
                            key={category.id}
                            variant={'outline'}
                          >
                            {category[`name_${language}`]}
                          </Badge>
                        ))}
                      </Wrap>
                    </Stack>
                    <Stack flex={1} h={'full'}>
                      <Text color={'black'} fontWeight={700}>
                        {t('description')}
                      </Text>
                      <Text overflowY={'auto'} h={'full'}>
                        {description || 'No description'}
                      </Text>
                    </Stack>
                  </Stack>
                  <Box
                    pos={'sticky'}
                    bottom={0}
                    bg={'white'}
                    p={{ base: 4, lg: 8 }}
                    borderBottomWidth={1}
                  >
                    <ArtFeedbackForm
                      art={art}
                      editor={editor}
                      onClose={onClose}
                      onSuccess={onSuccess}
                      setIsEditing={setIsEditing}
                    />
                  </Box>
                </Stack>
              )}
              {isEditing && (
                <Stack gap={4} p={{ base: 4, lg: 8 }} overflowY={'auto'}>
                  <HStack justify={'space-between'}>
                    <Heading color={'primary.500'} fontWeight={700}>
                      {t('edit')}
                    </Heading>
                  </HStack>
                  <ModelEditForm<Art>
                    noColumns
                    defaultIsEditing={isEditing}
                    onCancel={() => setIsEditing(false)}
                    endpoint={'arts'}
                    model={art}
                    onSuccess={() => {
                      setIsEditing(false)
                      onSuccess?.()
                    }}
                  />
                </Stack>
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
