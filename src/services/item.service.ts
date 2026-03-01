import { prisma } from '../libs/prisma.js'
import { CreateItemPayload, UpdateItemPayload } from '../schema/item.schema.js'
import { QueryParams } from '../types/query.type.js'

export const createItemService = async (payload: CreateItemPayload) => {
  return await prisma.item.create({
    data: {
      title: payload.title,
      image_url: payload.image_url,
      price: payload.price,
      stock: payload.stock,
      unlimited_stock: payload.unlimited_stock,
      sku_code: payload.sku_code,
      seller_name: payload.seller_name,
      category_id: payload.category_id,
    },
  })
}

export const updateItemService = async (payload: UpdateItemPayload, id: string) => {
  return await prisma.item.update({
    where: { id },
    data: {
      title: payload.title,
      image_url: payload.image_url,
      price: payload.price,
      stock: payload.stock,
      unlimited_stock: payload.unlimited_stock,
      sku_code: payload.sku_code,
      seller_name: payload.seller_name,
      category_id: payload.category_id,
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

export const countItemsService = async (params: QueryParams) => {
  return await prisma.item.count({
    where: {
      AND: [
        {
          title: { contains: params.search, mode: 'insensitive' },
        },
      ],
    },
  })
}

export const getItemById = async (id: string) => {
  return await prisma.item.findUnique({
    where: { id },
  })
}
