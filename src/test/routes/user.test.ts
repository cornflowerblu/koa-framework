import request from 'supertest'
import app from '../../app'
import { getRoute } from '../../router'
import faker from '@faker-js/faker'

describe('User API', () => {
  test('Create user endpoint creates a user', async () => {
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
  })
})
