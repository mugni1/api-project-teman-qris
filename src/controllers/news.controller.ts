import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createNewsSchema, updateNewsSchema } from '../schema/news.schema.js'
import {
  countNewsService,
  createNewsService,
  deleteNewsService,
  getNewsByIdService,
  getNewsService,
  updateNewsService,
} from '../services/news.service.js'
import { Meta } from '../types/meta.type.js'
import { QueryParams } from '../types/query.type.js'

export const getNews = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getNewsService(params)
    meta.total = await countNewsService(params)
    response({ res, status: 200, message: 'Success get news', data, meta })
  } catch (err: unknown) {
    console.log(err)
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const getNewsById = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }

  try {
    const result = await getNewsByIdService(id)
    if (!result) {
      return response({ res, status: 404, message: 'News not found' })
    }
    response({ res, status: 200, message: 'Success get news detail', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const createNews = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }

  const { success, error, data } = createNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }

  try {
    const result = await createNewsService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Failed create news' })
    }
    response({ res, status: 201, message: 'Success create news', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const updateNews = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }

  const { success, error, data } = updateNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }

  try {
    const isExistNews = await getNewsByIdService(id)
    if (!isExistNews) {
      return response({ res, status: 404, message: 'News not found' })
    }
    const result = await updateNewsService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed update news' })
    }
    response({ res, status: 200, message: 'Success update news', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const deleteNews = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }

  try {
    const isExistNews = await getNewsByIdService(id)
    if (!isExistNews) {
      return response({ res, status: 404, message: 'News not found' })
    }
    const result = await deleteNewsService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed delete news' })
    }
    response({ res, status: 200, message: 'Success delete news', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
