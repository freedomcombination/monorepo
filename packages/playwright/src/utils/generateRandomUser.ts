import { faker } from '@faker-js/faker'

import { PASSWORD } from '../constants'

export const generateRandomUser = () => {
  const name = faker.person.firstName()
  const username = faker.internet.userName()
  const email = faker.internet.email()

  // const password = faker.internet.password({
  //   length: 8,
  //   memorable: false,
  //   pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  // })

  return { name, username, email, password: PASSWORD }
}
