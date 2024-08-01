import { FC, useMemo, useState } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { addDays, format } from 'date-fns'
import { FaPlusCircle } from 'react-icons/fa'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { AuditLog } from '@fc/types'

import { AuditLogItem } from './AuditLogItem'
import { SearchForm } from '../SearchForm'

export const AuditLogList: FC = () => {
  const { profile, token } = useAuthContext()
  const [q, setQ] = useState('')

  const handleSearch = (query?: string) => {
    if (!query) return setQ('')
    setQ(query)
  }

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['audit-logs', q],
    queryFn: ({ pageParam = 1 }) =>
      strapiRequest<AuditLog>({
        endpoint: 'audit-logs',
        page: pageParam,
        token: token || '',
        filters: {
          $or: [
            { profile: { name: { $containsi: q } } },
            { text: { $containsi: q } },
            { action: { $containsi: q } },
            { uid: { $containsi: q } },
          ],
        },
        pageSize: 50,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = lastPage.meta.pagination.pageCount

      return allPages.length < totalPages ? allPages.length + 1 : undefined
    },

    enabled: !!token,
  })

  const logs = useMemo(
    () => data?.pages.flatMap(page => page.data) || [],
    [data],
  )

  // Group logs by today, yesterday, last week, and older
  const groupedLogs = useMemo(() => {
    const today = new Date()
    const yesterday = addDays(today, -1)
    const lastWeek = addDays(today, -7)

    const todayStr = format(today, 'yyyy-MM-dd')
    const yesterdayStr = format(yesterday, 'yyyy-MM-dd')
    const lastWeekStr = format(lastWeek, 'yyyy-MM-dd')

    return logs.reduce(
      (acc, log) => {
        const createdAt = new Date(log.createdAt)
        const createdAtStr = format(createdAt, 'yyyy-MM-dd')

        if (createdAtStr === todayStr) {
          acc.today.push(log)
        } else if (createdAtStr === yesterdayStr) {
          acc.yesterday.push(log)
        } else if (createdAtStr === lastWeekStr) {
          acc.lastWeek.push(log)
        } else {
          acc.older.push(log)
        }

        return acc
      },
      { today: [], yesterday: [], lastWeek: [], older: [] } as Record<
        'today' | 'yesterday' | 'lastWeek' | 'older',
        AuditLog[]
      >,
    )
  }, [logs])

  return (
    <Stack
      spacing={4}
      pt={1}
      pr={1}
      maxHeight={'calc(100vh - 90px)'}
      overflowY={'auto'}
    >
      <SearchForm
        bg={'white'}
        onSearch={handleSearch}
        placeholder={'Search by profile, action, text, or endpoint'}
      />

      {logs?.length === 0 && !isLoading && (
        <Box
          bg={'blackAlpha.100'}
          p={8}
          borderWidth={1}
          borderColor={'blackAlpha.300'}
          rounded={'md'}
        >
          No data found
        </Box>
      )}

      {logs?.length > 0 && (
        <Stack p={4} bg={'white'} shadow={'md'} rounded={'md'}>
          <Heading textAlign={'center'} size={'lg'}>
            Activity
          </Heading>
          {groupedLogs.today.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Today</Heading>
              <Stack p={4}>
                {groupedLogs.today.map(log => (
                  <AuditLogItem
                    key={log.id}
                    log={log}
                    isOwnProfile={log.profile?.id === profile?.id}
                  />
                ))}
              </Stack>
            </Stack>
          )}
          {groupedLogs.yesterday.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Yesterday</Heading>
              <Stack p={4}>
                {groupedLogs.yesterday.map(log => (
                  <AuditLogItem
                    key={log.id}
                    log={log}
                    isOwnProfile={log.profile?.id === profile?.id}
                  />
                ))}
              </Stack>
            </Stack>
          )}
          {groupedLogs.lastWeek.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Last week</Heading>
              <Stack p={4}>
                {groupedLogs.lastWeek.map(log => (
                  <AuditLogItem
                    key={log.id}
                    log={log}
                    isOwnProfile={log.profile?.id === profile?.id}
                  />
                ))}
              </Stack>
            </Stack>
          )}
          {groupedLogs.older.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Older</Heading>
              <Stack p={4}>
                {groupedLogs.older.map(log => (
                  <AuditLogItem
                    key={log.id}
                    log={log}
                    isOwnProfile={log.profile?.id === profile?.id}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          <Text fontSize={'sm'}>{logs.length} entries</Text>
          <Button
            // leftIcon={<FaPlusCircle />}
            variant={'outline'}
            onClick={() => fetchNextPage()}
            isLoading={isLoading}
            isDisabled={!hasNextPage}
            mx={'auto'}
            width={200}
          >
            Load More
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
