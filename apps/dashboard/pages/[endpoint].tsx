import { FC, useEffect, useState } from 'react'

import {
  Center,
  MenuDivider,
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context/auth'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import {
  endpointsWithApprovalStatus,
  endpointsWithPublicationState,
} from '@fc/services/common/urls'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type {
  ApprovalStatus,
  Post,
  Profile,
  ProfileStatus,
  Sort,
  StrapiCollectionEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
} from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { DataTable } from '@fc/ui/components/DataTable'
import { FilterMenu } from '@fc/ui/components/FilterMenu'
import { FilterOption, RelationFilterArgs } from '@fc/ui/components/FilterMenu'
import { ModelEditModal } from '@fc/ui/components/ModelEditModal'
import { ModelStatusFilters } from '@fc/ui/components/ModelStatusFilters'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { ProfileForms } from '@fc/ui/components/ProfileForms'
import { TabbedGenAIView } from '@fc/ui/components/TabbedGenAIView'
import type { WTableProps } from '@fc/ui/components/WTable'
import { useChangeParams } from '@fc/ui/hooks'
import { useColumns } from '@fc/ui/hooks/useColumns'
import { useRequestArgs } from '@fc/ui/hooks/useRequestArgs'

import { I18nNamespaces } from '../@types/i18next'

type ModelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ModelPage: FC<ModelPageProps> = ({ endpoint }) => {
  const { t } = useTranslation()
  const { roles, profile, token, isLoading } = useAuthContext()
  const { locale, query } = useRouter()
  const [selectedRelationFilters, setSelectedRelationFilters] = useState<
    RelationFilterArgs[]
  >([])
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { changeParams } = useChangeParams()

  const columns = useColumns()
  const requestArgs = useRequestArgs()

  const args = requestArgs[endpoint]

  const title = t(endpoint as keyof I18nNamespaces['common'])

  const isBlogAuthor =
    roles?.length === 1 && roles[0] === 'author' && endpoint === 'blogs'

  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20
  const published = (query.published as string) || 'all'
  const q = query.q as string
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const sort = query.sort as Sort
  const status = query.status as ApprovalStatus | 'all'
  const profileStatus = query.profileStatus as ProfileStatus | 'all'

  const hasApprovalStatus = endpointsWithApprovalStatus.includes(endpoint)
  const hasProfileStatus = endpoint === 'profiles'
  const hasPublicationState = endpointsWithPublicationState.includes(endpoint)
  const hasRelationFilters =
    args?.relationFilters && selectedRelationFilters.length > 0
  const hasExtraFilters = selectedFilters.length > 0

  const menuFilters = selectedFilters.reduce((acc, f) => {
    // There might be same field with different operators
    // We add a suffix to the field name to differentiate them
    // and to avoid MenuOption key duplication
    const filterField = f.field.replace('(ext)', '')

    if (filterField?.includes('.')) {
      const [field, subfield] = filterField.split('.')

      return {
        ...acc,
        [field]: {
          [subfield]: { [f.operator]: true },
        },
      }
    }

    return { ...acc, [filterField]: { [f.operator]: true } }
  }, {})

  const relationMenuFilters = selectedRelationFilters.reduce((acc, f) => {
    const filterField = f.field.replace('(ext)', '')

    if (filterField?.includes('.')) {
      const [field, subfield] = filterField.split('.')

      return {
        ...acc,
        [field]: {
          [subfield]: { id: { $in: f.ids } },
        },
      }
    }

    return { ...acc, [filterField]: { id: { $in: f.ids } } }
  }, {})

  const endpointQuery = useStrapiRequest<StrapiModel>({
    endpoint,
    page: currentPage || 1,
    filters: {
      ...(hasRelationFilters && relationMenuFilters),
      ...(hasExtraFilters && menuFilters),
      ...(isBlogAuthor && profile && { author: { id: { $eq: profile.id } } }),
      ...(q &&
        args?.searchFields && {
          // TODO: Support searchFields with relation fields
          $or: args?.searchFields?.map(f => ({ [f]: { $containsi: q } })),
        }),
      ...(published === 'false' && { publishedAt: { $null: true } }),
      ...(status !== 'all' && { approvalStatus: { $eq: status } }),
      ...(profileStatus !== 'all' && { profileStatus: { $eq: profileStatus } }),
    },
    ...(args?.populate && { populate: args.populate }),
    ...(pageSize && { pageSize }),
    ...(sort && { sort }),
    includeDrafts: published !== 'true',
    locale,
    queryOptions: {
      enabled: !!endpoint && !!token,
    },
  })

  const models = endpointQuery?.data?.data
  const pageCount = endpointQuery?.data?.meta?.pagination?.pageCount
  const totalCount = endpointQuery?.data?.meta?.pagination?.total

  const mappedModels = models?.map(m => ({
    ...m,
    translates:
      (m as StrapiTranslatableModel)?.localizations?.map(l => l.locale) || [],
  })) as StrapiModel[]
  const selectedModel = mappedModels?.find(m => m.id === selectedId)

  const post = selectedModel as Post

  const setSelectedId = (id?: number) => changeParams({ id })
  const setCurrentPage = (page?: number) => changeParams({ page })
  const setPageSize = (size?: number) => changeParams({ pageSize: size })
  const setSort = (sort?: Sort) => changeParams({ sort })
  const setStatus = (status: string) => changeParams({ status })
  const setProfileStatus = (profileStatus: string) =>
    changeParams({ profileStatus })
  const setPublished = (state: string) => changeParams({ published: state })
  const setQ = (q?: string) => changeParams({ q })

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }

  const handleRelationFilter = (args: RelationFilterArgs) => {
    setSelectedRelationFilters(prev => {
      const index = prev.findIndex(f => f.endpoint === args.endpoint)

      if (index > -1) {
        return [
          ...prev.slice(0, index),
          { ...prev[index], ids: args.ids },
          ...prev.slice(index + 1),
        ]
      }

      return [...prev, args]
    })
  }

  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => setCurrentPage(1), [])

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={{ title }}>
      <PageHeader
        {...(args && {
          ...(args.searchFields && { onSearch: setQ }),
          filterMenuCloseOnSelect: false,
          filterMenu: (
            <Stack divider={<MenuDivider />}>
              <ModelStatusFilters
                args={[
                  {
                    statuses: ['all', 'approved', 'pending', 'rejected'],
                    defaultValue: 'all',
                    currentValue: status,
                    setCurrentValue: setStatus,
                    hidden: !hasApprovalStatus,
                    title: 'approvalStatus',
                  },
                  {
                    statuses: [
                      'all',
                      'left',
                      'accepted',
                      'pending',
                      'rejected',
                      'approved',
                      'in-progress',
                      'awaiting',
                    ],
                    defaultValue: 'all',
                    currentValue: profileStatus,
                    setCurrentValue: setProfileStatus,
                    hidden: !hasProfileStatus,
                    title: 'profileStatus',
                  },
                  {
                    statuses: ['all', 'true', 'false'],
                    defaultValue: 'true',
                    currentValue: published,
                    setCurrentValue: setPublished,
                    hidden: !hasPublicationState,
                    title: 'published',
                  },
                ]}
              />
              <FilterMenu
                relationFilterOptions={args.relationFilters}
                setRelationFilter={handleRelationFilter}
                booleanFilterOptions={args.booleanFilters}
                setBooleanFilters={setSelectedFilters}
              />
            </Stack>
          ),
        })}
      />
      {selectedId && (
        <ModelEditModal<StrapiModel>
          endpoint={endpoint}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          title={`Edit ${endpoint}`}
          onSuccess={endpointQuery.refetch}
        >
          {endpoint === 'posts' && post && post?.hashtag && (
            <TabbedGenAIView post={post} hashtag={post.hashtag} noBorder />
          )}
          {endpoint === 'profiles' && selectedModel && selectedId && (
            <ProfileForms profile={selectedModel as Profile} />
          )}
        </ModelEditModal>
      )}

      {isLoading || endpointQuery.isPending || endpointQuery.isLoading ? (
        <Center h={'full'}>
          <Spinner size={'xl'} color={'primary.500'} />
        </Center>
      ) : (
        <DataTable
          columns={columns[endpoint] as WTableProps<StrapiModel>['columns']}
          data={mappedModels}
          pageCount={pageCount as number}
          totalCount={totalCount as number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onSort={setSort}
          onClickRow={handleClick}
          pageSize={pageSize}
          setPageSize={setPageSize}
          allowExportPDF
        />
      )}
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const endpoint = (context.params as any).endpoint as StrapiCollectionEndpoint

  return {
    props: {
      endpoint,
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ModelPage
