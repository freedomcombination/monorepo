import { FC, PropsWithChildren } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AiOutlineFileExclamation } from 'react-icons/ai'
import { FaExclamation } from 'react-icons/fa6'
import { LuFileArchive } from 'react-icons/lu'

import type {
  ArchiveContent,
  Category,
  Hashtag,
  Prison,
  Victim,
} from '@fc/types'

import { useFields, useSchema } from '../../hooks'
import { ModelCreateModal } from '../ModelCreateModal'

type GenAlertProps = {
  categories: Category[]
  victims: Victim[]
  prisons: Prison[]
  showAlert: boolean
  hashtag: Hashtag
  onArchiveCreate: () => void
}

export const GenAlert: FC<PropsWithChildren<GenAlertProps>> = ({
  categories,
  victims,
  prisons,
  showAlert,
  hashtag,
  onArchiveCreate,
  children,
}) => {
  const { t } = useTranslation()

  const schemas = useSchema()
  const fields = useFields()
  const { locale } = useRouter()

  const hasRelations =
    categories.length > 0 || victims.length > 0 || prisons.length > 0

  return (
    <Alert
      flexDirection={'column'}
      gap={4}
      status="warning"
      px={4}
      py={{ base: 8, lg: 32 }}
    >
      <AlertIcon boxSize={'40px'} as={AiOutlineFileExclamation} />
      <AlertDescription maxW={500}>
        <VStack>
          <Heading
            textAlign={'center'}
            fontWeight={600}
            as={'h3'}
            size={'md'}
            color={'orange.500'}
          >
            No content sources found!
          </Heading>
          {hasRelations && (
            <Box
              borderWidth={1}
              p={2}
              rounded={'md'}
              borderColor={'orange.500'}
            >
              <List>
                <ListItem display={'flex'} alignItems={'baseline'}>
                  <ListIcon as={FaExclamation} color={'orange.500'} />
                  <Box>
                    {categories.length > 0
                      ? `No archives found with the hashtag's categories: "${categories.map(c => c[`name_${locale}`]).join(', ')}"`
                      : `No categories set for the hashtag ${hashtag.title}`}
                  </Box>
                </ListItem>
                {showAlert && (
                  <ListItem display={'flex'} alignItems={'baseline'}>
                    <ListIcon as={FaExclamation} color={'orange.500'} />
                    {victims.length > 0
                      ? `No archives found with the hashtag's victims: "${victims.map(v => v.name).join(', ')}"`
                      : `No victims set for the hashtag ${hashtag.title}`}
                  </ListItem>
                )}
                {showAlert && (
                  <ListItem display={'flex'} alignItems={'baseline'}>
                    <ListIcon as={FaExclamation} color={'orange.500'} />
                    {prisons.length > 0
                      ? `No archives found with the hashtag's prisons: "${prisons.map(p => p.name).join(', ')}"`
                      : `No victims set for the prison ${hashtag.title}`}
                  </ListItem>
                )}
              </List>
            </Box>
          )}

          <Stack>
            <Box>AI generation cannot be used without a content source</Box>
            {showAlert ? (
              <Box>{`Please update either the categories of the hashtag "${hashtag.title}", the victim or the prison of this post in order to find related content sources`}</Box>
            ) : (
              <Box>{`Please update the categories of the hashtag "${hashtag.title}"`}</Box>
            )}
          </Stack>
          {hasRelations && (
            <ModelCreateModal<ArchiveContent>
              title={t('create-archive-content')}
              endpoint="archive-contents"
              schema={schemas['archive-contents']!}
              fields={fields['archive-contents']!}
              onSuccess={onArchiveCreate}
              buttonProps={{
                variant: 'outline',
                colorScheme: 'orange',
                leftIcon: <LuFileArchive />,
              }}
              initialValues={{
                categories,
                victims,
                prisons,
              }}
            >
              {t('create-archive-content')}
            </ModelCreateModal>
          )}
          {children}
        </VStack>
      </AlertDescription>
    </Alert>
  )
}
