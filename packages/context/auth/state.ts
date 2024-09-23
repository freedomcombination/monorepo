import { AuthContextType } from './types'

export const initialAuthState = {
  error: null,
  isAdmin: false,
  isAuthModalOpen: false,
  loading: false,
  demoPermissions: null,
  permissions: {},
  profile: null,
  roles: ['public'],
  token: null,
  user: null,
  site: 'foundation',
} as AuthContextType
