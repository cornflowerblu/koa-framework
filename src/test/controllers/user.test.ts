import request from 'supertest'
import app from '../../app'
import { getRoute } from '../../router'
import faker from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { createUser } from '../../models/user'

const prisma = new PrismaClient()
prisma.$connect

beforeAll(async () => {
  // Clean up before tests
  await prisma.user.deleteMany()
})

describe('User API', () => {
  test('Create endpoint should create a new user', async () => {
    const url = getRoute('create new user')
    const newUser = {
      id: 0,
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: faker.random.alphaNumeric(),
      role: 'USER',
    }
    const response = await request(app.callback()).post(url).send(newUser)
    expect(response.status).toBe(200)
    expect(response.text).toContain('success')
    expect(response.text).toContain('true')
  })

  test('Create endpoint with missing data should result in an error', async () => {
    const url = getRoute('create new user')
    const newUser = {
      name: faker.name.firstName(),
      password: faker.random.alphaNumeric(),
      role: 'USER',
    }
    const response = await request(app.callback()).post(url).send(newUser)
    expect(response.status).toBe(400)
    expect(response.text).toContain('success')
    expect(response.text).toContain('false')
  })

  test('Get users endpoint retrieves all users', async () => {
    const url = getRoute('get all users')
    const response = await request(app.callback()).get(url)
    expect(response.status).toBe(200)
    expect(response.text).toContain('success')
    expect(response.text).toContain('true')
    expect(response.body.users.length).toBeGreaterThan(0)
  })

  test('Get single user endpoint retrieves only one user', async () => {
    const user = await createUser({
      id: 1,
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: faker.random.alphaNumeric(),
      role: 'USER',
    })

    const response = await request(app.callback()).get(`/users/${user.id}`)
    expect(response.status).toBe(200)
    expect(response.text).toContain('success')
    expect(response.text).toContain('true')
    expect(response.body.user).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'USER',
    })
  })

  test('Get single user but none is found', async () => {
    const response = await request(app.callback()).get(`/users/a`)
    expect(response.status).toBe(404)
    expect(response.text).toContain('success')
    expect(response.text).toContain('false')
  })

  test('Get users endpoint should return 404 if none are found', async () => {
    const url = getRoute('get all users')
    await prisma.user.deleteMany()
    const response = await request(app.callback()).get(url)
    expect(response.status).toBe(404)
    expect(response.text).toContain('success')
    expect(response.text).toContain('false')
    expect(response.body.users.length).toBe(0)
  })
})

afterAll(() => {
  prisma.$disconnect
})
