import { faker } from '@faker-js/faker'
import { CourseApplication } from '@fc/types'
import slugify from '@sindresorhus/slugify'

const getProfiles = async () =>
  await strapi.entityService.findMany('api::profile.profile')

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

  const profiles = await getProfiles()

  for await (const profile of profiles) {
    const { name, email, phone } = generateMockUser()

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
      },
    })
  }

  console.log('-'.repeat(50))

  console.log(`Mocked ${profiles.length} profiles`)

  const updatedProfiles = await getProfiles()

  const users = await strapi.entityService.findMany(
    'plugin::users-permissions.user',
  )

  let matchedUsers = 0

  for await (const user of users) {
    const { username, email } = generateMockUser()

    const matchedProfile = profiles.find(
      profile => profile.email === user.email,
    )

    if (matchedProfile) {
      const matchedUpdatedProfile = updatedProfiles.find(
        profile => profile.id === matchedProfile?.id,
      )

      matchedUsers++

      await strapi.entityService.update(
        'plugin::users-permissions.user',
        user.id,
        {
          data: {
            email: matchedUpdatedProfile.email,
            username: slugify(matchedUpdatedProfile.name),
          },
        },
      )
    } else {
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
    }
  }

  console.log(`Mocked ${users.length} users`)
  console.log(`Matched ${matchedUsers} users`)

  console.log('-'.repeat(50))

  console.log('Mockifying roles...')
  const roles = await strapi.entityService.findMany(
    'plugin::users-permissions.role',
  )

  if (!Array.isArray(roles)) {
    console.error('No roles found to mockify')

    return
  }

  for await (const role of roles) {
    const userResponse = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      { filters: { username: role.type } },
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

    await strapi.entityService.create('api::profile.profile', {
      data: {
        name,
        email,
        user: createdUser.id,
      } as any,
    })
  }

  console.log(`Created ${roles.length} role users`)

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
          profile: null,
          message: faker.lorem.paragraph(),
        } as CourseApplication,
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
      return
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
