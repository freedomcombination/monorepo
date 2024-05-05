module.exports = {
  async getProfile(ctx) {
    if (!ctx.state.user) {
      throw ctx.unauthorized('You are not authenticated')
    }

    const userId = ctx.state.user.id

    try {
      // what should I use here?
      const profileResponse = await strapi.entityService.findMany(
        'api::profile.profile',
        {
          filters: {
            user: { id: { $eq: userId } },
          },
          populate: '*',
        },
      )

      const profile = profileResponse?.[0] || null

      if (!profile) {
        return ctx.notFound('Profile not found')
      }

      //const platform = ctx.params?.platform 

      const includePermissions = true
      //  platform === 'dashboard' || platform === 'trend-rights' 

      const rolePermissions = includePermissions
        ? (
            await strapi.plugins['users-permissions'].services.role.findOne(
              ctx.state.user.role.id,
            )
          ).permissions
        : {}

      const newProfile = { ...profile }
      delete newProfile.user

      return { data: { ...profile, permissions: rolePermissions } }
    } catch (error) {
      strapi.log.error(error)
      throw error
    }
  },
}
