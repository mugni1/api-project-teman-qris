import { Request, Response } from 'express'
import { response } from '../utils/response.js'

export const sayHello = (req: Request, res: Response) => {
  response({ res, status: 200, message: 'Hello World from teman qriss project' })
}
