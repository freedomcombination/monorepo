import { FC, useEffect } from 'react'

import { Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { useLocalStorage } from 'react-use'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { DevMail } from '@fc/types/dev-mail'

import { DevMailButton } from './DevMailButton'
import { DevMailContext } from './DevMailContext'
import { DevMailModal } from './DevMailModal'

let refetchTimerId: NodeJS.Timeout | string | number | undefined = undefined

export const DevMailProvider: FC = () => {
  const [_checkTimer, setCheckTimer] = useLocalStorage(
    'dev-mail-checkTimer',
    15,
  )
  const checkTimer = _checkTimer ?? 15
  const [_lastGroupTime, setLastGroupTime] = useLocalStorage(
    'dev-mail-lastGroupTime',
    new Date(0).toISOString(),
  )
  const [lastNewCount, setLastNewCount] = useLocalStorage(
    'dev-mail-lastNewCount',
    0,
  )
  const lastGroupTime = _lastGroupTime ?? new Date(0).toISOString()
  const { data, refetch } = useStrapiRequest<DevMail>({
    endpoint: 'dev-mails',
    token: '' // only public permission is needed
  })
  const toast = useToast()

  const mails = data?.data ?? []
  const newCount = !lastGroupTime
    ? 0 // give some time to read from local storage
    : mails.reduce(
      (acc, mail) => (mail.groupDate > lastGroupTime ? acc + 1 : acc),
      0,
    )

  useEffect(() => {
    if ((lastNewCount ?? 0) < newCount) {
      toast({
        title: 'New Dev Mail',
        description: `There are ${newCount} new dev mail(s)`,
        status: 'info',
        duration: 5000,
        variant: 'left-accent',
        position: 'bottom-right',
        isClosable: true,
      })
      setLastNewCount(newCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCount, lastNewCount])

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      if (newCount > 0) setLastGroupTime(new Date().toISOString())
    },
  })

  useEffect(() => {
    clearInterval(refetchTimerId)

    if (!!checkTimer)
      refetchTimerId = setInterval(() => {
        refetch()
      }, checkTimer * 1000)

    return () => clearInterval(refetchTimerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkTimer])

  return (
    <DevMailContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        count: newCount,
        mails,
        lastGroupTime,
        refetch,
        checkTimer,
        setCheckTimer,
      }}
    >
      <Stack>
        <DevMailButton />
        <DevMailModal />
      </Stack>
    </DevMailContext.Provider>
  )
}
