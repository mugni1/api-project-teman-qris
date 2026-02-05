import { prisma } from '../libs/prisma.js'
import { CreateNewsPayload, UpdateNewsPayload } from '../schema/news.schema.js'
import { QueryParams } from '../types/query.type.js'

export const createNewsService = async (payload: CreateNewsPayload) => {
  return await prisma.news.create({
    data: {
      image_url: payload.image_url,
      title: payload.title,
      content: payload.content,
    },
  })
}

export const updateNewsService = async (payload: UpdateNewsPayload, id: string) => {
  return await prisma.news.update({
    where: { id },
    data: {
      image_url: payload.image_url,
      title: payload.title,
      content: payload.content,
    },
  })
}

export const deleteNewsService = async (id: string) => {
  return await prisma.news.delete({
    where: { id },
  })
}

export const getNewsService = async (params: QueryParams) => {
  return await prisma.news.findMany({
    where: {
      OR: [
        { title: { contains: params.search, mode: 'insensitive' } },
        { content: { contains: params.search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}

export const countNewsService = async (params: QueryParams) => {
  return await prisma.news.count({
    where: {
      OR: [
        { title: { contains: params.search, mode: 'insensitive' } },
        { content: { contains: params.search, mode: 'insensitive' } },
      ],
    },
  })
}

export const getNewsByIdService = async (id: string) => {
  return await prisma.news.findUnique({
    where: { id },
  })
}
