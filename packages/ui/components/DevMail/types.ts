import { Dispatch, SetStateAction } from 'react'

import { DevMail } from '@fc/types/dev-mail'

export type DevMailContextType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  count: number
  refetch: () => void
  mails: DevMail[]
  lastGroupTime: string
  checkTimer: number
  setCheckTimer: Dispatch<SetStateAction<number | undefined>>
}
