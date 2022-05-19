import request from 'supertest'
import app from '../app'

test('Hello world works', async () => {
  const response = await request(app.callback()).get('/')
  expect(response.status).toBe(403)
  expect(response.text).toMatchSnapshot()
})
