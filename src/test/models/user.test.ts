import { createUser, getUserById, getUsers } from '../../models/user'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  // Clean before tests
  prisma.$connect
  await prisma.user.deleteMany()

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

describe('Users', () => {
  it('should retrieve one user', async () => {
    // console.log(await getUserById(1));
    expect(await getUserById(1)).toBeDefined()
  })

  it('should retrieve many users', async () => {
    const users = await getUsers()
    expect(users[0].id).toBeGreaterThanOrEqual(1)
    expect(users[1].id).toBeGreaterThanOrEqual(1)
    expect((await getUsers()).length).toBeGreaterThan(0)
  })
})

afterAll(async () => {
  // Clean after tests
  await prisma.user.deleteMany()
  prisma.$disconnect
})
