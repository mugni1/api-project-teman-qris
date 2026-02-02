import { prisma } from '../libs/prisma.js'
import { RegisterAuthGooglePayload, RegisterPayload } from '../schema/auth.schema.js'

export const getUserDetailByIdService = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  })
}

export const registerService = async (payload: RegisterPayload) => {
  return await prisma.user.create({
    data: {
      firstname: payload.firstname,
      lastname: payload.lastname,
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
      provider: 'default',
    },
    omit: {
      password: true,
    },
  })
}

export const registerEmailExistService = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    omit: { password: true },
  })
}

export const loginEmailExistService = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })
}

export const getUserByIdService = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  })
}

export const getUserByEmailService = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    omit: { password: true },
  })
}

export const registerAuthGoogleService = async (payload: RegisterAuthGooglePayload, avatar: string) => {
  return await prisma.user.create({
    data: {
      firstname: payload.firstname,
      lastname: payload.lastname,
      fullname: payload.fullname,
      email: payload.email,
      avatar: avatar,
      provider: 'google',
    },
    omit: {
      password: true,
    },
  })
}
