import { useContext } from 'react'

import { JoinFormContext } from './JoinFormContext'

export const useJoinFormContext = () => {
  return useContext(JoinFormContext)
}
