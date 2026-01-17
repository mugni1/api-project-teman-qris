import { prisma } from "../libs/prisma.js";
import { CreateItemPayload, UpdateItemPayload } from "../schema/item.schema.js";
import { QueryParams } from "../types/query.type.js";

export const createItemService = async (payload: CreateItemPayload) => {
    return await prisma.item.create({
        data: {
            title: payload.title,
            price: payload.price,
            provider: payload.provider,
            stock: payload.stock
        }
    })
}

export const updateItemService = async (payload: UpdateItemPayload, id: string) => {
    return await prisma.item.update({
        where: { id },
        data: {
            title: payload.title,
            price: payload.price,
            provider: payload.provider,
            stock: payload.stock
        }
    })
}

export const deleteItemService = async (id: string) => {
    return await prisma.item.delete({
        where: { id }
    })
}

export const getItemsService = async (params: QueryParams) => {
    return await prisma.item.findMany({
        where: {
            title: { contains: params.search, mode: 'insensitive' },
        },
        orderBy: {
            [params.orderBy]: params.sortBy
        },
        skip: params.offset,
        take: params.limit
    })
}

export const getItemById = async (id: string) => {
    return await prisma.item.findUnique({
        where: { id }
    })
}