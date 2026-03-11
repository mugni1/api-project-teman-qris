import { prisma } from '../libs/prisma.js'
import { CreateCategoryPayload, UpdateCategoryPayload } from '../schema/category.schema.js'
import { QueryParams } from '../types/query.type.js'

const categoryTypes = ['credit', 'quota', 'games', 'bill'] as const

type CategoryType = (typeof categoryTypes)[number]

export const createCategoryService = async (payload: CreateCategoryPayload) => {
  return await prisma.category.create({
    data: {
      title: payload.title,
      studio: payload.studio,
      image_url: payload.image_url,
      cover_url: payload.cover_url,
      type: payload.type,
      column_1: payload.column_1,
      column_2: payload.column_2,
      column_1_title: payload.column_1_title,
      column_2_title: payload.column_2_title,
    },
  })
}

export const updateCategoryService = async (payload: UpdateCategoryPayload, id: string) => {
  return await prisma.category.update({
    where: { id },
    data: {
      title: payload.title,
      studio: payload.studio,
      image_url: payload.image_url,
      cover_url: payload.cover_url,
      type: payload.type,
      column_1: payload.column_1,
      column_2: payload.column_2,
      column_1_title: payload.column_1_title,
      column_2_title: payload.column_2_title,
    },
  })
}

export const deleteCategoryService = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  })
}

export const getCategoriesService = async (params: QueryParams, type?: 'credit' | 'quota' | 'games' | 'bill') => {
  return await prisma.category.findMany({
    where: {
      AND: {
        OR: [
          { title: { contains: params.search, mode: 'insensitive' } },
          { studio: { contains: params.search, mode: 'insensitive' } },
          { studio: { contains: params.search, mode: 'insensitive' } },
        ],
        type,
      },
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}

export const countCategoriesService = async (params: QueryParams, type?: 'credit' | 'quota' | 'games' | 'bill') => {
  return await prisma.category.count({
    where: {
      AND: {
        OR: [
          { title: { contains: params.search, mode: 'insensitive' } },
          { studio: { contains: params.search, mode: 'insensitive' } },
          { studio: { contains: params.search, mode: 'insensitive' } },
        ],
        type,
      },
    },
  })
}

export const getCategoryByIdService = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: {
          sku_code: 'desc',
        },
      },
    },
  })
}
