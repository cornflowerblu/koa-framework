import { createUser, getUserById, getUsers } from '../../models/user'
import { faker } from '@faker-js/faker'

beforeAll(async () => {
  await createUser({
    id: 0,
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.alphaNumeric(),
    role: 'USER',
  })

  await createUser({
    id: 1,
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.alphaNumeric(),
    role: 'USER',
  })

  console.log(`Two Users were created!`)
})

it('should retrieve one user', async () => {
  // console.log(await getUserById(1));
  expect(await getUserById(1)).toBeDefined()
})

it('should retrieve many users', async () => {
  expect((await getUsers()).length).toBeGreaterThan(0)
})
