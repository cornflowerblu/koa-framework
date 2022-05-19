import request from 'supertest'
import app from '../../app'
import { getRoute } from '../../router'
import faker from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  prisma.$connect
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
    expect(response.body.users[0].id).toBeGreaterThan(1)
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

afterAll(async () => {
  await prisma.user.deleteMany()
  prisma.$disconnect
})
