import { useEffect, useState } from 'react'

import { Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { DEV_MAIL } from '@fc/mocks/dev-mail'

import { DevMailButton } from './DevMailButton'
import { DevMailContext } from './DevMailContext'
import { DevMailModal } from './DevMailModal'
import { DevMailContextType } from './types'

const getArgs = () => {
  const fakeMails = DEV_MAIL.data
  const index = fakeMails.length / 2
  const lastGroupTime = fakeMails[index]?.groupDate ?? new Date().toISOString()

  return { mails: fakeMails, lastGroupTime }
}

export default {
  title: 'DEVTOOLS/DevMailProvider',
  component: DevMailContext.Provider,
  args: getArgs(),
} as Meta

type StoryArg = Pick<DevMailContextType, 'mails' | 'lastGroupTime'>

type Story = StoryObj<StoryArg>

let refetchTimerId: NodeJS.Timeout | string | number | undefined = undefined
const Template: StoryFn<StoryArg> = arg => {
  const [_checkTimer, setCheckTimer] = useState<number | undefined>(15)
  const checkTimer = _checkTimer ?? 15
  const lastGroupTime = arg.lastGroupTime
  const [lastNewCount, setLastNewCount] = useState(0)
  const toast = useToast()

  const mails = arg.mails ?? []
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

  const setLastGroupTime = (time: string) => {
    console.log('setLastGroupTime', time)
  }

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      if (newCount > 0) {
        setLastGroupTime(new Date().toISOString())
        setLastNewCount(0)
      }
    },
  })

  const refetch = () => {}

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

export const Default: Story = {
  render: Template,
}
