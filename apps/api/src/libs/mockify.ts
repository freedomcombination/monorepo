import { faker } from '@faker-js/faker'
import { Role, StrapiLocale } from '@fc/types'
import slugify from '@sindresorhus/slugify'
import { sample } from 'lodash'

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
  if (process.env.ENABLE_MOCKIFY !== 'true') {
    return
  }

  const profilesWithUser = await strapi.entityService.findMany(
    'api::profile.profile',
    {
      populate: ['user'],
      filters: { user: { id: { $gt: 0 } } },
    },
  )

  const profilesWithoutUser = await strapi.entityService.findMany(
    'api::profile.profile',
    { filters: { user: null } },
  )

  const roles = (await strapi.entityService.findMany(
    'plugin::users-permissions.role',
  )) as Role[]

  console.log('-'.repeat(50))

  console.log('Mockifying profiles with user...')

  for await (const [index, profileWithUser] of profilesWithUser.entries()) {
    const mockUser = generateMockUser()
    const name = roles[index]?.name || mockUser.name
    const username = roles[index]?.type || slugify(name)
    const email = roles[index]?.type
      ? `${roles[index]?.type}@fc.com`
      : mockUser.email
    const phone = mockUser.phone

    await strapi.entityService.update(
      'api::profile.profile',
      profileWithUser.id,
      {
        data: {
          name,
          email,
          phone,
          comment: faker.lorem.sentence(),
          address: {
            city: faker.location.city(),
            country: faker.location.country(),
          },
          locale: sample<StrapiLocale>(['en', 'nl', 'tr']),
        },
      },
    )

    await strapi.plugins['users-permissions'].services.user.edit(
      profileWithUser.user.id,
      {
        email,
        username,
        password: 'Test?123',
        ...(roles[index] && {
          role: roles[index].id,
          profileStatus: 'accepted',
        }),
      },
    )
  }

  console.log(`Mocked ${profilesWithUser.length} profiles with user`)

  console.log('-'.repeat(50))

  console.log('Mockifying profiles without user...')

  for await (const profileWithoutUser of profilesWithoutUser) {
    const { name, email, phone } = generateMockUser()

    await strapi.entityService.update(
      'api::profile.profile',
      profileWithoutUser.id,
      {
        data: {
          name,
          email,
          phone,
          comment: faker.lorem.sentence(),
          address: {
            city: faker.location.city(),
            country: faker.location.country(),
          },
          locale: sample<StrapiLocale>(['en', 'nl', 'tr']),
        },
      },
    )
  }

  console.log(`Mocked ${profilesWithoutUser.length} profiles without user`)

  console.log('-'.repeat(50))

  console.log('Mockifying donates...')

  const donates = await strapi.entityService.findMany('api::donate.donate')

  for await (const donate of donates) {
    const { name, email, phone } = generateMockUser()

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
    const { name, email } = generateMockUser()

    if (comment.profile) {
      continue
    }

    await strapi.entityService.update('api::comment.comment', comment.id, {
      data: {
        name,
        email,
        content: faker.lorem.sentence(),
      },
    })
  }

  console.log(`Mocked ${comments.length} comments`)
}
