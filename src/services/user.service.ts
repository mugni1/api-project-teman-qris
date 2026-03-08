import { prisma } from '../libs/prisma.js'
import { QueryParams } from '../types/query.type.js'

export const getUserServices = async (id: string, params: QueryParams) => {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              fullname: { contains: params.search, mode: 'insensitive' },
            },
            {
              email: { contains: params.search, mode: 'insensitive' },
            },
            {
              firstname: { contains: params.search, mode: 'insensitive' },
            },
            {
              lastname: { contains: params.search, mode: 'insensitive' },
            },
            {
              provider: { contains: params.search, mode: 'insensitive' },
            },
          ],
        },
        {
          NOT: [{ id }],
        },
      ],
    },
    omit: { password: true },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}

export const countUserServices = async (id: string, params: QueryParams) => {
  return await prisma.user.count({
    where: {
      AND: [
        {
          OR: [
            {
              fullname: { contains: params.search, mode: 'insensitive' },
            },
            {
              email: { contains: params.search, mode: 'insensitive' },
            },
            {
              firstname: { contains: params.search, mode: 'insensitive' },
            },
            {
              lastname: { contains: params.search, mode: 'insensitive' },
            },
            {
              provider: { contains: params.search, mode: 'insensitive' },
            },
          ],
        },
        {
          NOT: [{ id }],
        },
      ],
    },
  })
}
