import { prisma } from '../libs/prisma.js'
import { CreateCarouselPayload, UpdateCarouselPayload } from '../schema/carousel.schema.js'
import { QueryParams } from '../types/query.type.js'

// get
export const getCarouselsService = async (params: QueryParams) => {
  return await prisma.carousel.findMany({
    where: {
      OR: [
        { title: { contains: params.search, mode: 'insensitive' } },
        { link: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
  })
}
export const countCarouselService = async (params: QueryParams) => {
  return await prisma.carousel.count({
    where: {
      OR: [
        { title: { contains: params.search, mode: 'insensitive' } },
        { link: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ],
    },
  })
}

export const getCarouselByIdService = async (id: string) => {
  return await prisma.carousel.findUnique({
    where: { id },
  })
}

// delete
export const deleteCarouselService = async (id: string) => {
  return await prisma.carousel.delete({
    where: { id },
  })
}

// create
export const createCarouselService = async (payload: CreateCarouselPayload) => {
  return await prisma.carousel.create({
    data: {
      title: payload.title,
      description: payload.description,
      image_url: payload.image_url,
      is_active: payload.is_active,
      link: payload.link,
    },
  })
}

// update
export const updateCarouselService = async (id: string, payload: UpdateCarouselPayload) => {
  return await prisma.carousel.update({
    where: {
      id,
    },
    data: {
      title: payload.title,
      description: payload.description,
      image_url: payload.image_url,
      is_active: payload.is_active,
      link: payload.link,
    },
  })
}
