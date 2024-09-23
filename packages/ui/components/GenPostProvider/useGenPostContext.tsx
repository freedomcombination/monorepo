import { useContext } from 'react'

import { GenPostContext } from './GenPostContext'

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}
