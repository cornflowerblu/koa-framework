import { getRoute } from '../router'

test('route path is returned', () => {
  let routeData = {
    name: 'home page protected',
    path: '/',
  }

  expect(getRoute(routeData.name)).toBe('/')
})
