import { prisma } from '../libs/prisma.js'
import { CreateCategoryPayload, UpdateCategoryPayload } from '../schema/category.schema.js'
import { QueryParams } from '../types/query.type.js'

const categoryTypes = ['credit', 'quota', 'games', 'bill'] as const

type CategoryType = (typeof categoryTypes)[number]

export const createCategoryService = async (payload: CreateCategoryPayload) => {
  return await prisma.category.create({
    data: {
      title: payload.title,
      image_url: payload.image_url,
      cover_url: payload.cover_url,
      type: payload.type,
    },
  })
}

export const updateCategoryService = async (payload: UpdateCategoryPayload, id: string) => {
  return await prisma.category.update({
    where: { id },
    data: {
      title: payload.title,
      image_url: payload.image_url,
      cover_url: payload.cover_url,
      type: payload.type,
    },
  })
}

export const deleteCategoryService = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  })
}

export const getCategoriesService = async (params: QueryParams) => {
  const search = params.search.toLowerCase()
  const typeSearch: CategoryType | undefined = categoryTypes.includes(search as CategoryType)
    ? (search as CategoryType)
    : undefined

  return await prisma.category.findMany({
    where: {
      OR: [{ title: { contains: params.search, mode: 'insensitive' } }, ...(typeSearch ? [{ type: typeSearch }] : [])],
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}

export const countCategoriesService = async (params: QueryParams) => {
  const search = params.search.toLowerCase()
  const typeSearch: CategoryType | undefined = categoryTypes.includes(search as CategoryType)
    ? (search as CategoryType)
    : undefined

  return await prisma.category.count({
    where: {
      OR: [{ title: { contains: params.search, mode: 'insensitive' } }, ...(typeSearch ? [{ type: typeSearch }] : [])],
    },
  })
}

export const getCategoryByIdService = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
  })
}
