import { DevMailProvider } from './DevMailProvider'

export const DevMailContainer = () => {
  if (process.env.NODE_ENV !== 'development') return null

  return <DevMailProvider />
}
