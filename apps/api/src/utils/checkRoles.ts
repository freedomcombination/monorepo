import { getProfile } from './getProfile'

export const checkRoles = (roles: string[]) => {
  const ctx = strapi.requestContext.get()

  const userRole = ctx?.state?.user?.role?.type as string

  if (!roles || !userRole) return false

  return roles.some(role => userRole.includes(role))
}

export const checkAdmin = () => checkRoles(['admin'])

export const checkOwner = async (profileId: string | number) => {
  const profile = await getProfile()

  const id = typeof profileId === 'string' ? parseInt(profileId) : profileId

  return profile && profile.id === id
}
