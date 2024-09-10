import { FC, PropsWithChildren } from 'react'

import { Box, Heading, List, Stack, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AiOutlineFileExclamation } from 'react-icons/ai'
import { FaExclamation } from 'react-icons/fa6'
import { LuFileArchive } from 'react-icons/lu'

import { Alert } from '@fc/chakra'
import { ArchiveContent, Category, Hashtag, Tag } from '@fc/types'

import { useFields, useSchema } from '../../hooks'
import { ModelCreateModal } from '../ModelCreateModal'

type GenAlertProps = {
  categories: Category[]
  tags: Tag[]
  showTagAlert: boolean
  hashtag: Hashtag
  onArchiveCreate: () => void
}

export const GenAlert: FC<PropsWithChildren<GenAlertProps>> = ({
  categories,
  tags,
  showTagAlert,
  hashtag,
  onArchiveCreate,
  children,
}) => {
  const { t } = useTranslation()

  const schemas = useSchema()
  const fields = useFields()
  const { locale } = useRouter()

  const hasCategoriesOrTags = categories.length > 0 || tags.length > 0

  return (
    <Alert
      flexDirection={'column'}
      gap={4}
      status="warning"
      px={4}
      py={{ base: 8, lg: 32 }}
      icon={<AiOutlineFileExclamation width={'40px'} height={'40px'} />}
    >
      <VStack maxW={500}>
        <Heading
          textAlign={'center'}
          fontWeight={600}
          as={'h3'}
          size={'md'}
          color={'orange.500'}
        >
          No content sources found!
        </Heading>
        {hasCategoriesOrTags && (
          <Box borderWidth={1} p={2} rounded={'md'} borderColor={'orange.500'}>
            <List.Root>
              <List.Item display={'flex'} alignItems={'baseline'}>
                <List.Indicator as={FaExclamation} color={'orange.500'} />
                <Box>
                  {categories.length > 0
                    ? `No archives found with the hashtag's categories: "${categories.map(c => c[`name_${locale}`]).join(', ')}"`
                    : `No categories set for the hashtag ${hashtag.title}`}
                </Box>
              </List.Item>
              {showTagAlert && (
                <List.Item display={'flex'} alignItems={'baseline'}>
                  <List.Indicator as={FaExclamation} color={'orange.500'} />
                  {tags.length > 0
                    ? `No archives found with the post's tags: "${tags.map(t => t[`name_${locale}`]).join(', ')}"`
                    : `No tags set for the post`}
                </List.Item>
              )}
            </List.Root>
          </Box>
        )}

        <Stack>
          <Box>AI generation cannot be used without a content source</Box>
          <Box>{`Please update either the categories of the hashtag "${hashtag.title}" or the tags of this post in order to find related content sources`}</Box>
        </Stack>
        {hasCategoriesOrTags && (
          <ModelCreateModal<ArchiveContent>
            title={t('create-archive-content')}
            endpoint="archive-contents"
            schema={schemas['archive-contents']!}
            fields={fields['archive-contents']!}
            onSuccess={onArchiveCreate}
            buttonProps={{
              variant: 'outline',
              colorPalette: 'orange',
              leftIcon: <LuFileArchive />,
            }}
            initialValues={{
              categories,
              tags,
            }}
          >
            {t('create-archive-content')}
          </ModelCreateModal>
        )}
        {children}
      </VStack>
    </Alert>
  )
}
