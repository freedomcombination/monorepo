import { FC, useMemo, useState } from 'react'

import { Box, Divider, Heading, Stack } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { addDays, format } from 'date-fns'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { AuditLog } from '@fc/types'

import { AuditLogItem } from './AuditLogItem'
import { SearchForm } from '../../components'

export const AuditLogList: FC = () => {
  const { profile, token } = useAuthContext()
  const [profileName, setProfileName] = useState('')

  const handleSearch = (name?: string) => {
    if (!name) return setProfileName('')

    setProfileName(name)
  }

  const { data } = useInfiniteQuery({
    queryKey: ['audit-logs'],
    queryFn: ({ pageParam = 1 }) =>
      strapiRequest<AuditLog>({
        endpoint: 'audit-logs',
        page: pageParam,
        token: token || '',
        filters: {
          profile: {
            name: {
              $containsi: profileName,
            },
          },
        },
        pageSize: 100,
      }),
    refetchInterval: 5000,
    initialPageParam: 0,
    getNextPageParam: r => (r.meta?.pagination?.page || 0) + 1,
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
    <Stack spacing={4} pt={1}>
      <SearchForm
        bg={'white'}
        onSearch={handleSearch}
        placeholder={"Search by profile's name"}
      />

      {logs?.length === 0 && (
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
              <Stack p={4} divider={<Divider />}>
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
              {groupedLogs.yesterday.map(log => (
                <AuditLogItem
                  key={log.id}
                  log={log}
                  isOwnProfile={log.profile?.id === profile?.id}
                />
              ))}
            </Stack>
          )}
          {groupedLogs.lastWeek.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Last week</Heading>
              {groupedLogs.lastWeek.map(log => (
                <AuditLogItem
                  key={log.id}
                  log={log}
                  isOwnProfile={log.profile?.id === profile?.id}
                />
              ))}
            </Stack>
          )}
          {groupedLogs.older.length > 0 && (
            <Stack>
              <Heading size={'lg'}>Older</Heading>
              {groupedLogs.older.map(log => (
                <AuditLogItem
                  key={log.id}
                  log={log}
                  isOwnProfile={log.profile?.id === profile?.id}
                />
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  )
}
