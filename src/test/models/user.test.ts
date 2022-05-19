import { createUser, getUserById, getUsers } from '../../models/user'
import { faker } from '@faker-js/faker'

beforeAll(async () => {
  const user1: any = await createUser({
    id: 0,
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.alphaNumeric(),
    role: 'USER',
  })

  const user2: any = await createUser({
    id: 1,
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.alphaNumeric(),
    role: 'USER',
  })

  console.log(`Two Users ${user1.name} and ${user2.name} were created!`)
})

it('should retrieve one user', async () => {
  // console.log(await getUserById(1));
  expect(await getUserById(1)).toBeDefined()
})

it('should retrieve many users', async () => {
  const users = await getUsers()
  expect(users[0].id).toBe(1)
  expect(users[1].id).toBe(2)
  expect((await getUsers()).length).toBeGreaterThan(0)
})
