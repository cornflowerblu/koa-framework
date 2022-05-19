import invariant from 'tiny-invariant'
import routes from './constants/routes'

export type Routes = {
  name: string
  path: string
}

const router: Array<Routes> = routes

const getRoute = (name: string): string => {
  let routeName = router.find((el) => el.name === name)
  invariant(routeName)
  return routeName?.path
}

export default getRoute
