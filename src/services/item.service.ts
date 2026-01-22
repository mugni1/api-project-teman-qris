import { prisma } from '../libs/prisma.js'
import { CreateItemPayload, UpdateItemPayload } from '../schema/item.schema.js'
import { QueryParams } from '../types/query.type.js'

export const createItemService = async (payload: CreateItemPayload) => {
  return await prisma.item.create({
    data: {
      title: payload.title,
      price: payload.price,
      provider: payload.provider,
      stock: payload.stock,
      type_credit: payload.type_credit,
      type_status: payload.type_status,
    },
  })
}

export const updateItemService = async (payload: UpdateItemPayload, id: string) => {
  return await prisma.item.update({
    where: { id },
    data: {
      title: payload.title,
      price: payload.price,
      provider: payload.provider,
      stock: payload.stock,
      type_credit: payload.type_credit,
      type_status: payload.type_status,
    },
  })
}

export const deleteItemService = async (id: string) => {
  return await prisma.item.delete({
    where: { id },
  })
}

export const getItemsService = async (params: QueryParams) => {
  return await prisma.item.findMany({
    where: {
      AND: [
        {
          title: { contains: params.search, mode: 'insensitive' },
          provider: params.filter_by_provider as 'axis' | 'xl' | 'indosat' | 'telkomsel' | 'smartfren' | 'byu',
          type_credit: params.filter_by_credit as 'credit' | 'quota',
          type_status: params.filter_by_status as 'regular' | 'promo',
        },
      ],
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}

export const getItemById = async (id: string) => {
  return await prisma.item.findUnique({
    where: { id },
  })
}
