import Boom from '@hapi/boom'
import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export type UserReturn<T> = {
  statusCode: number
  error: string
  message: string
  user: T
}

export const getUsers = async (): Promise<Array<User>> =>
  await prisma.user.findMany()

export const getUserById = async (id: number): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    }
  } catch (error) {
    console.log(error)
    return Boom.badRequest().output.payload
  }
}

export const createUser = async (user: User): Promise<any> => {
  const securePassword = await bcrypt.hash(user.password, 10)
  try {
    user = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: securePassword,
        role: user.role,
      },
    })
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.log(error)
    return Boom.badRequest().output.payload
  }
}
