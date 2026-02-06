import fileUpload from 'express-fileupload'
import { response } from './response.js'
import { Response } from 'express'
import cloudinary from '../libs/cloudinary.js'

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
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'item/images' }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
        .end(image.data)
    })
    return result
  } catch (errors) {
    return response({ res, status: 500, message: 'Internal server error', errors })
  }
}
