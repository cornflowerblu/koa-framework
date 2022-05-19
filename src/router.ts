import Koa from 'koa'
import Router from 'koa-router'
import invariant from 'tiny-invariant'
import { createNewUser } from './controllers/user'
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

export default routes
