import { faker } from '@faker-js/faker'
import { Profile, StrapiLocale } from '@fc/types'
import slugify from '@sindresorhus/slugify'

const getProfiles = async () =>
  (await strapi.entityService.findMany('api::profile.profile', {
    populate: ['user', 'user.role'],
  })) as Profile[]

export const mockify = async () => {
  if (process.env.ENABLE_MOCKIFY !== 'true') {
    return
  }

  const roles: Record<string, boolean> = {}
  const generateMockUser = (role: string | null) => {
    const getUserNameAndMail = (name: string) => {
      if (role && !roles[role]) {
        roles[role] = true

        return {
          username: role,
          email: `${role}@fc.com`,
        }
      }
      const username = slugify(name)
      const email = `${username}@example.com`

      return { username, email }
    }

    const name = faker.person.fullName()
    const { username, email } = getUserNameAndMail(name)
    const password = 'Test?123'
    const phone = faker.phone.number()

    return {
      name,
      username,
      email,
      password,
      phone,
    }
  }

  const profiles = await getProfiles()

  for await (const profile of profiles) {
    const { name, email, phone, username, password } =
      // i'm not sure this is the right way to check if this user is admin
      generateMockUser(profile?.user?.role?.type)

    await strapi.entityService.update('api::profile.profile', profile.id, {
      data: {
        name,
        email,
        phone,
        comment: faker.lorem.sentence(),
        address: {
          city: faker.location.city(),
          country: faker.location.country(),
        },
        locale: profile.locale ?? ['en', 'tr', 'nl'][faker.number.int({ max: 2 })] as StrapiLocale,
      },
    })

    if (!profile.user) {
      console.debug(
        `Profile ${profile.email} (id:${profile.id}) has no user, this should not happen...`,
      )
      continue
    }

    await strapi.entityService.update(
      'plugin::users-permissions.user',
      profile.user.id,
      {
        data: {
          username,
          email,
        },
      },
    )

    await strapi
      .plugin('users-permissions')
      .service('user')
      .edit(profile.user.id, { password })
  }

  console.log('-'.repeat(50))

  console.log(`Mocked ${profiles.length} profiles`)

  const users = await strapi.entityService.findMany(
    'plugin::users-permissions.user',
    {
      populate: '*',
      filters: {
        email: {
          $not: {
            $and: [{ $endsWith: '@example.com' }, { $endsWith: '@fc.com' }],
          },
        },
      },
    },
  )

  console.debug('Users without profiles')
  for await (const user of users) {
    console.debug(`${user.email} (${user.id}) has no profile!!`)

    const { username, email, password } = generateMockUser(user.role?.type)

    await strapi.entityService.update(
      'plugin::users-permissions.user',
      user.id,
      {
        data: {
          email,
          username,
        },
      },
    )

    await strapi
      .plugin('users-permissions')
      .service('user')
      .edit(user.id, { password })
  }

  console.log('-'.repeat(50))

  console.log('Mockifying donates...')

  const donates = await strapi.entityService.findMany('api::donate.donate')

  for await (const donate of donates) {
    const { name, email, phone } = generateMockUser(null)

    await strapi.entityService.update('api::donate.donate', donate.id, {
      data: { name, email, phone },
    })
  }

  console.log(`Mocked ${donates.length} donates`)

  console.log('-'.repeat(50))

  console.log('Mockifying applications...')

  const applications = await strapi.entityService.findMany(
    'api::course-application.course-application',
  )

  for await (const application of applications) {
    const { name, email, phone } = generateMockUser(null)

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
          //  profile: null, lets keep this relation.
          message: faker.lorem.paragraph(),
        },
      },
    )
  }

  console.log(`Mocked ${applications.length} applications`)

  console.log('-'.repeat(50))

  console.log('Mockifying comments...')

  const comments = await strapi.entityService.findMany('api::comment.comment', {
    populate: ['profile'],
  })

  for await (const comment of comments) {
    const { name, email } = generateMockUser(null)

    if (comment.profile) {
      continue
    }

    await strapi.entityService.update('api::comment.comment', comment.id, {
      data: {
        name,
        email,
        content: faker.lorem.sentence(),
        profile: null,
      },
    })
  }

  console.log(`Mocked ${comments.length} comments`)
}
