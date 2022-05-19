import Koa from 'koa'
import Boom from '@hapi/boom'

export async function getProtectedHomepage(ctx: Koa.Context) {
  ctx.status = Boom.forbidden().output.statusCode
  ctx.body = Boom.forbidden().output.payload
}

export async function getUnprotectedHomepage(ctx: Koa.Context) {
  return (ctx.body = 'Hi!')
}
