export const syncAdmin = async () => {
  const STRAPI_ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL as string
  const STRAPI_ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD as string

  if (!STRAPI_ADMIN_EMAIL || !STRAPI_ADMIN_PASSWORD) {
    strapi.log.warn(
      '🟡 STRAPI_ADMIN_EMAIL or STRAPI_ADMIN_PASSWORD environment variables not set',
    )

    return
  }

  const existingAdmin =
    await strapi.admin.services.user.findOneByEmail(STRAPI_ADMIN_EMAIL)

  if (!existingAdmin) {
    const createdAdmin = await strapi.admin.services.user.create({
      password: STRAPI_ADMIN_PASSWORD,
      email: STRAPI_ADMIN_EMAIL,
      roles: [1],
      isActive: true,
    })

    strapi.log.info(`✅ Admin ${createdAdmin.email?.toUpperCase()} created`)
  } else {
    strapi.log.info(
      `🟡 Admin ${existingAdmin.email?.toUpperCase()} already exists`,
    )
  }
}
