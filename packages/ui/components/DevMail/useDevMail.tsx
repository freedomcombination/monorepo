import { useContext } from 'react'

import { DevMailContext } from './DevMailContext'

export const useDevMail = () => useContext(DevMailContext)
