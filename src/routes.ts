import invariant from 'tiny-invariant'

type Routes = {
  name: string
  path: string
}

const routes: Array<Routes> = [
  {
    name: 'home',
    path: '/',
  },
]

const getRoute = (name: string): string => {
  let routeName = routes.find((el) => el.name === name)
  invariant(routeName)
  return routeName?.path
}

export default getRoute
