import Koa from 'koa'
import Router from 'koa-router'
import getRoute from './routes'

const app = new Koa()
const router = new Router()

router.get(getRoute('home'), (ctx: Koa.Context) => {
  ctx.body = 'Hello World'
})

app.use(router.routes())

export default app
