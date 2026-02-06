import fileUpload from 'express-fileupload'
import { response } from './response.js'
import { Response } from 'express'
import { imageKit } from '../libs/imagekit.js'

export const imageValidateAndUpload = async (image: fileUpload.UploadedFile, res: Response) => {
  if (!image) {
    return response({ res, message: 'Image is required', status: 400 })
  }
  if (image.size > 4 * 1024 * 1024) {
    return response({ res, message: 'maximum Image size 4MB', status: 400 })
  }
  if (!image.mimetype.startsWith('image')) {
    return response({ res, message: 'Please input valid image', status: 400 })
  }
  try {
    const result = await imageKit.upload({
      file: image.data,
      fileName: image.name,
      folder: '/uploads',
    })
    return result
  } catch (errors) {
    return response({ res, status: 500, message: 'Internal server error', errors })
  }
}
