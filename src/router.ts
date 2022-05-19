import Koa from 'koa'
import Router from 'koa-router'
import invariant from 'tiny-invariant'
import { createNewUser, getManyUsers } from './controllers/user'
import {
  getProtectedHomepage,
  getUnprotectedHomepage,
} from './controllers/homepage'

type Routes = {
  name: string
  path: string
}

export const getRoute = (name: string): string => {
  let routeName = routes.find((el) => el.name === name)
  invariant(routeName)
  return routeName?.path
}

export const router = new Router()

const routes: Array<Routes> = [
  {
    name: 'home page protected',
    path: '/',
  },
  {
    name: 'landing page un-protected',
    path: '/page',
  },
  {
    name: 'create new user',
    path: '/user/create',
  },
  {
    name: 'get all users',
    path: '/users',
  },
]

router.get(getRoute('home page protected'), (ctx: Koa.Context) =>
  getProtectedHomepage(ctx)
)

router.get(getRoute('landing page un-protected'), (ctx: Koa.Context) =>
  getUnprotectedHomepage(ctx)
)

router.post(getRoute('create new user'), (ctx: Koa.Context) =>
  createNewUser(ctx)
)

router.get(getRoute('get all users'), (ctx: Koa.Context) => getManyUsers(ctx))

export default routes
