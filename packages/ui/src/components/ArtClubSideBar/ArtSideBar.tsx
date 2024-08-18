import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { Category, Collection } from '@fc/types'

import { useChangeParams } from '../../hooks'
import { CategoryFilter } from '../CategoryFilter'
import { CollectionList } from '../CollectionList'

export type ArtSideBarProps = {
  categoryList: Category[]
  loading: boolean
  setIsLoading: (loading: boolean) => void
}

export const ArtSideBar: FC<ArtSideBarProps> = ({
  categoryList,
  loading,
  setIsLoading,
}) => {
  const { t } = useTranslation()
  const changeParam = useChangeParams()
  const {
    locale,
    query: { categories },
  } = useRouter()

  const collectionsQuery = useStrapiRequest<Collection>({
    endpoint: 'collections',
    locale,
  })

  const initialCategories = (categories as string)
    ?.split('&')
    .map(category => category.split('=')[1])

  return (
    <Stack gap={8} alignSelf="start">
      {categoryList && (
        <Box maxH="calc((100vh - 150px) / 2)" overflowY="scroll">
          <CategoryFilter
            categoryData={categoryList || []}
            initialCategories={initialCategories}
            loading={loading}
            selectCategories={value => changeParam({ categories: value })}
            setIsLoading={setIsLoading}
            title={t('categories')}
            locale={locale}
          />
        </Box>
      )}

      {collectionsQuery?.data && collectionsQuery?.data?.data?.length > 0 && (
        <Box overflowY="auto" maxH="calc((100vh - 150px) / 2)">
          <CollectionList
            collectionData={collectionsQuery.data?.data || []}
          ></CollectionList>
        </Box>
      )}
    </Stack>
  )
}
