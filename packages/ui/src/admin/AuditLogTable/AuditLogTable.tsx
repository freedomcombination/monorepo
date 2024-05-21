import React, { FC, useState } from 'react'

import { Center, Heading, Stack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { t } from 'i18next'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { AuditLog, Profile, Sort } from '@fc/types'

import { DataTable } from '../DataTables'

export const AuditLogTable: FC = () => {
  const { user, profile, token } = useAuthContext()
  const [requestParams, setRequestParams] = useState<{
    page: number
    pageSize: number
    sort?: Sort
  }>({
    page: 1,
    pageSize: 10,
  })

  const logResult = useStrapiRequest<AuditLog>({
    endpoint: 'audit-logs',
    queryOptions: { enabled: !!token },
    page: requestParams.page,
    pageSize: requestParams.pageSize,
    sort: requestParams.sort,
  })

  const logs = logResult?.data?.data
  const pageCount = logResult?.data?.meta?.pagination?.pageCount
  const totalCount = logResult?.data?.meta?.pagination?.total
  const hideLog = !logs || logs.length === 0

  return (
    <>
      {hideLog ? (
        <Center minH={'50vh'}>
          <Heading as={'h1'}>
            {t('welcome')}
            {(user || profile) && ` ${profile?.name || user?.username}`}
          </Heading>
        </Center>
      ) : (
        <Stack>
          <Heading as={'h1'}>
            {t('welcome')}
            {(user || profile) && ` ${profile?.name || user?.username}`}
          </Heading>

          <DataTable
            columns={{
              uid: {
                sortable: true,
                label: 'UID',
              },
              action: {
                sortable: true,
                label: 'ACTION',
              },
              text: {
                label: 'LOG',
              },
              createdAt: {
                sortable: true,
                label: 'TIME',
                transform: value => {
                  return format(value as string, 'yyyy-MM-dd HH:mm:ss')
                },
              },
              profile: {
                label: 'PROFILE',
                transform: value => {
                  return (value as Profile)?.name
                },
              },
              modelId: {
                label: 'MODEL ID',
                sortable: true,
              },
            }}
            data={logs}
            pageCount={pageCount as number}
            totalCount={totalCount as number}
            currentPage={requestParams.page}
            setCurrentPage={page =>
              setRequestParams({ ...requestParams, page })
            }
            onSort={sort => setRequestParams({ ...requestParams, sort })}
            pageSize={requestParams.pageSize}
            setPageSize={pageSize =>
              setRequestParams({ ...requestParams, pageSize })
            }
          />
        </Stack>
      )}
    </>
  )
}
