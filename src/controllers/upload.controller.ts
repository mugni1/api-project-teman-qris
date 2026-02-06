import { Request, Response } from 'express'
import { imageValidateAndUpload } from '../utils/image.js'
import { response } from '../utils/response.js'
import fileUpload from 'express-fileupload'

export const upload = async (req: Request, res: Response) => {
  try {
    const data = await imageValidateAndUpload(req.files?.image as fileUpload.UploadedFile, res)
    response({ res, status: 200, message: 'Success upload file', data })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
