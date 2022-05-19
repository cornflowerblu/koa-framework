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

export async function getManyUsers(ctx: Koa.Context) {
  try {
    let users: Array<User> = await getUsers()
    if (users.length === 0) {
      ;(ctx.status = 404),
        (ctx.body = {
          success: false,
          users,
        })
    } else
      ctx.body = {
        success: true,
        users,
      }
  } catch (error) {
    console.log(error)
    ;(ctx.status = 404),
      (ctx.body = {
        success: false,
        users: Boom.notFound().output.payload,
      })
  }
}
