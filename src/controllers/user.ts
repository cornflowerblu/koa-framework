import Koa from 'koa'
import Boom from '@hapi/boom'
import { getUsers, createUser } from '../models/user'

export async function createNewUser(ctx: Koa.Context) {
  try {
    const user: any = await createUser(ctx.request.body)
    if (user.statusCode === 400) {
      ctx.body = { success: false, user }
      ctx.status = 400
    } else
      ctx.body = {
        success: true,
        user,
      }
  } catch (error) {
    console.error(error)
    ;(ctx.status = 400),
      (ctx.body = {
        success: false,
        user: Boom.badRequest().data,
      })
  }
}
