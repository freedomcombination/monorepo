import { faker } from '@faker-js/faker'
import { CourseApplication } from '@fc/types'
import slugify from '@sindresorhus/slugify'

const generateMockUser = () => {
  const name = faker.person.fullName()
  const username = slugify(name)
  const email = `${username}@example.com`
  const password = faker.internet.password()
  const phone = faker.phone.number()

  return {
    name,
    username,
    email,
    password,
    phone,
  }
}

export const mockify = async () => {
  const profileData = await strapi.entityService.findMany(
    'api::profile.profile',
    { limit: 10000 },
  )

  if (!Array.isArray(profileData)) {
    console.error('No profiles found to mockify')

    return
  }

  await Promise.all(
    profileData.map(async profile => {
      const userResponse = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        { filters: { email: profile.email } },
      )

      const { name, username, email, phone, password } = generateMockUser()

      await strapi.entityService.update('api::profile.profile', profile.id, {
        data: { name, email, phone },
      })

      const id = userResponse?.[0]?.id

      if (!id) {
        return
      }

      strapi.entityService.update('plugin::users-permissions.user', id, {
        data: {
          email,
          username,
          password,
        },
      })
    }),
  )

  const roles = await strapi.entityService.findMany(
    'plugin::users-permissions.role',
  )

  if (!Array.isArray(roles)) {
    console.error('No roles found to mockify')

    return
  }

  await Promise.all(
    roles.map(async role => {
      const userResponse = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: {
            email: `${role.type}@example.com`,
          },
        },
      )

      const id = userResponse?.[0]?.id

      if (id) {
        return
      }

      const name = role.name
      const username = role.type
      const email = `${username}@example.com`
      const password = 'Test?123'

      const createdUser = await strapi.entityService.create(
        'plugin::users-permissions.user',
        {
          data: {
            email,
            username,
            password,
            confirmed: true,
            role: role.id,
          },
        },
      )

      console.log('createdUser', createdUser)

      await strapi.entityService.create('api::profile.profile', {
        data: {
          name,
          email,
          user: createdUser.id,
        } as any,
      })
    }),
  )

  const donates = await strapi.entityService.findMany('api::donate.donate', {
    limit: 10000,
  })

  const { name, email, phone } = generateMockUser()

  await Promise.all(
    donates.map(async donate => {
      await strapi.entityService.update('api::donate.donate', donate.id, {
        data: { name, email, phone },
      })
    }),
  )

  const applications = await strapi.entityService.findMany(
    'api::course-application.course-application',
    {
      limit: 10000,
    },
  )

  await Promise.all(
    applications.map(async application => {
      const { name, email, phone } = generateMockUser()

      await strapi.entityService.update(
        'api::course-application.course-application',
        application.id,
        {
          data: {
            name,
            email,
            phone,
            city: faker.location.city(),
            country: faker.location.country(),
            profile: null,
            message: faker.lorem.paragraph(),
          } as CourseApplication,
        },
      )
    }),
  )

  const comments = await strapi.entityService.findMany('api::comment.comment', {
    limit: 10000,
  })

  await Promise.all(
    comments.map(async comment => {
      const { name, email } = generateMockUser()

      await strapi.entityService.update('api::comment.comment', comment.id, {
        data: {
          name,
          email,
          content: faker.lorem.sentence(),
          profile: null,
        },
      })
    }),
  )
}
