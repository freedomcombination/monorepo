import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MdCollectionsBookmark } from 'react-icons/md'

import { CollectionListProps } from './types'

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Stack>
      <HStack py={1.5} w="full" align="center">
        <Box as={MdCollectionsBookmark} />
        <Text display={{ base: 'none', lg: 'block' }} fontWeight={600}>
          {t('collections')}
        </Text>
      </HStack>
      <Divider />
      {collectionData.map((collection, index) => (
        <Link
          key={index}
          href={`/${locale}/club/collections/${collection.slug}`}
          py={2}
          lineHeight="1.15"
          _hover={{ color: 'primary.500' }}
        >
          {collection.title}
        </Link>
      ))}
    </Stack>
  )
}
