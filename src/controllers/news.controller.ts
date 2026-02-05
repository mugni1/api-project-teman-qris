import { Response } from 'express'
import { response } from '../utils/response.js'

export const getNews = async (req: Request, res: Response) => {
  try {
    response({ res, status: 200, message: 'Success' })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const getNewsById = async (req: Request, res: Response) => {
  try {
    response({ res, status: 200, message: 'Success' })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const createNews = async (req: Request, res: Response) => {
  try {
    response({ res, status: 200, message: 'Success' })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const updateNews = async (req: Request, res: Response) => {
  try {
    response({ res, status: 200, message: 'Success' })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const deleteNews = async (req: Request, res: Response) => {
  try {
    response({ res, status: 200, message: 'Success' })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
