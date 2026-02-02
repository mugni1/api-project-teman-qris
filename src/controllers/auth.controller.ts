import 'dotenv/config'
import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import {
  getUserByEmailService,
  getUserByIdService,
  loginEmailExistService,
  registerAuthGoogleService,
  registerEmailExistService,
  registerService,
} from '../services/auth.service.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'
import { comparePassword, hashedPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'
import { authClient, authGoogleUrl } from '../libs/oauth.js'
import { google } from 'googleapis'

export const me = async (req: Request, res: Response) => {
  const userId = req.user_id as string
  try {
    const data = await getUserByIdService(userId)
    response({ res, status: 200, message: 'Success get user', data })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }
  const { data, success, error } = registerSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }
  try {
    data.password = hashedPassword(data.password)
    data.fullname = `${data.firstname} ${data?.lastname || ''}`.trim()
    // check email exist
    const isEmailExist = await registerEmailExistService(data.email)
    if (isEmailExist) {
      return response({ res, status: 400, message: 'Failed register email is already exist' })
    }
    // store to db
    const result = await registerService(data)
    response({ res, status: 201, message: 'Success register', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const loginController = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }
  const { data, success, error } = loginSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }
  try {
    // find user exsist with email
    const isEmailExist = await loginEmailExistService(data.email)
    if (!isEmailExist) {
      return response({ res, status: 400, message: 'Failed login invalid email or password' })
    }
    // compare password
    const isValidPassword = await comparePassword(data.password, isEmailExist.password as string)
    if (!isValidPassword) {
      return response({ res, status: 400, message: 'Failed login invalid email or password' })
    }
    // generate token
    const token = generateToken({
      id: isEmailExist.id,
      email: isEmailExist.email,
      role: isEmailExist.role,
      firstname: isEmailExist.firstname,
      lastname: isEmailExist.lastname || '',
      fullname: isEmailExist.fullname || '',
    })
    isEmailExist.password = null
    response({
      res,
      status: 200,
      message: 'Success login',
      data: {
        token,
        user: isEmailExist,
      },
    })
  } catch (err: unknown) {
    response({ res, status: 500, message: 'Internal server error', errors: err })
  }
}

export const googleRedirect = (req: Request, res: Response) => {
  res.redirect(authGoogleUrl)
}

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string
  try {
    // set credentials
    const { tokens } = await authClient.getToken(code)
    authClient.setCredentials(tokens)

    // get user info
    const oauth2 = google.oauth2({
      auth: authClient,
      version: 'v2',
    })
    const { data: userInfo } = await oauth2.userinfo.get()

    // checking
    if (userInfo) {
      const existUser = await getUserByEmailService(userInfo.email as string)
      if (existUser) {
        if (existUser.provider != 'google') {
          return res.redirect(`${process.env.FE_ORIGIN_URL}/login?message=Akun_sudah_terdaftar`)
        } else {
          const token = generateToken({
            id: existUser.id,
            email: existUser.email,
            role: existUser.role,
            firstname: existUser.firstname,
            lastname: existUser.lastname || '',
            fullname: existUser.fullname || '',
          })
          const hashToken = btoa(token)
          return res.redirect(`${process.env.FE_ORIGIN_URL}/redirect?message=Berhasil_masuk&bb=${hashToken}`)
        }
      }
      const registered = await registerAuthGoogleService(
        {
          email: userInfo.email as string,
          firstname: userInfo.given_name as string,
          lastname: userInfo.family_name as string,
          fullname: userInfo.name as string,
        },
        userInfo.picture as string,
      )
      const token = generateToken({
        id: registered.id,
        email: registered.email,
        role: registered.role,
        firstname: registered.firstname,
        lastname: registered.lastname || '',
        fullname: registered.fullname || '',
      })
      const hashToken = btoa(token)
      return res.redirect(`${process.env.FE_ORIGIN_URL}/redirect?message=Berhasil_masuk&bb=${hashToken}`)
    } else {
      res.redirect(`${process.env.FE_ORIGIN_URL}/login?message=Coba_lagi_nanti`)
    }
  } catch {
    res.redirect(`${process.env.FE_ORIGIN_URL}/login?message=Coba_lagi_nanti`)
  }
}
