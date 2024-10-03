import { faker } from '@faker-js/faker'
import type { User } from '@fc/types'
import slugify from '@sindresorhus/slugify'

export const mockify = async () => {
  const profileData = await strapi.entityService.findMany(
    'api::profile.profile',
  )

  await Promise.all(
    profileData.map(async profile => {
      const userResponse = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: {
            email: profile.email,
          },
        },
      )

      const fullName = faker.person.fullName()
      const username = slugify(fullName)
      const email = `${username}@example.com`

      profile.name = fullName
      profile.email = email
      profile.phone = faker.phone.number()

      await strapi.entityService.update('api::profile.profile', profile.id, {
        data: profile,
      })

      const id = userResponse?.[0]?.id

      if (!id) {
        return
      }

      strapi.entityService.update('plugin::users-permissions.user', id, {
        data: {
          email: email,
          username: username,
          password: faker.internet.password(),
        } as Partial<User>,
      })
    }),
  )

  const roles = await strapi.entityService.findMany(
    'plugin::users-permissions.role',
  )

  // TODO: Create new user for each role if not exists
  // e.g. author@freedomcombination.com, Test?123
  console.log('Roles', roles)
}
