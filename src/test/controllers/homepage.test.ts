import request from 'supertest'
import app from '../../app'
import { getRoute } from '../../router'

test('Unauthorized page throws 403', async () => {
  const url = getRoute('home page protected')
  const response = await request(app.callback()).get(url)
  expect(response.status).toBe(403)
  expect(response.text).toMatchSnapshot()
})

test('Un-protected page returns a response', async () => {
  const url = getRoute('landing page un-protected')
  const response = await request(app.callback()).get(url)
  expect(response.status).toBe(200)
  expect(response.text).toMatchSnapshot()
})
