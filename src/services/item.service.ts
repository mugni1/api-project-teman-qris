import { prisma } from "../libs/prisma.js";
import { CreateItemPayload } from "../schema/item.schema.js";

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