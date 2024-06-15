import { getProfile } from './getProfile'
import { Context } from 'koa'

export const checkRoles = (ctx: Context, roles: string[]) => {
  const userRole = ctx?.state?.user?.role?.type as string

  if (!roles || !userRole) return false

  return roles.some(role => userRole.includes(role))
}

export const checkAdmin = (ctx: Context) => checkRoles(ctx, ['admin'])

export const checkOwner = async (ctx: Context, profileId: string | number) => {
  const profile = await getProfile(ctx)

  const id = typeof profileId === 'string' ? parseInt(profileId) : profileId

  return profile && profile.id === id
}
