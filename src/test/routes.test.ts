import getRoute from '../router'

test('route path is returned', () => {
  let routeData = {
    name: 'home',
    path: '/',
  }

  expect(getRoute(routeData.name)).toBe('/')
})
