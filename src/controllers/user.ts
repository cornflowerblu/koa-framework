import Koa from 'koa'
import Boom from '@hapi/boom'
import { getUsers, createUser, UserReturn } from '../models/user'
import { User } from '@prisma/client'

export async function createNewUser(ctx: Koa.Context) {
  try {
    const user: UserReturn<User> = await createUser(ctx.request.body)
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
