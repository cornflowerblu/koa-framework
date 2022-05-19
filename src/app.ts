import Koa from 'koa'
import Router from 'koa-router'
import json from 'koa-json'
import getRoute from './router'
import Boom from '@hapi/boom'

const app = new Koa()
const router = new Router()

app.use(json())
app.use(router.routes())

router.get(getRoute('home'), (ctx: Koa.Context) => {
  ctx.status = Boom.forbidden().output.statusCode
  ctx.body = Boom.forbidden().output.payload
})

export default app
