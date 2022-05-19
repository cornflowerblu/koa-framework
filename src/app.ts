import Koa from 'koa'
import json from 'koa-json'
import { router } from './router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(json())
app.use(bodyParser())
app.use(router.routes())

export default app
