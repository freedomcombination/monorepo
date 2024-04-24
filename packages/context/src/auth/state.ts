import { AuthContextType, AuthPermissionFuncs } from './types'

export const initialAuthState: AuthContextType = {
  isLoading: false,
  error: null,
  token: null,
  user: null,
  profile: null,
  roles: ['public'],
  permissions: {},
  setPermissions: () => {},
  openAuthModal: () => {},
  closeAuthModal: () => {},
  isAuthModalOpen: false,
  checkAuth: () => Promise.resolve(initialAuthState),
  login: () => Promise.resolve(initialAuthState),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(initialAuthState),
  permissionCheck: {} as AuthPermissionFuncs,
}
