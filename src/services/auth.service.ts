import { prisma } from "../libs/prisma.js"
import { RegisterPayload } from "../schema/auth.schema.js"

export const registerService = async (payload: RegisterPayload) => {
    return await prisma.user.create({
        data: {
            firstname: payload.firstname,
            lastname: payload.lastname,
            fullname: payload.fullname,
            email: payload.email,
            password: payload.password,
        },
        omit: {
            password: true
        }
    })
}

export const registerEmailExistService = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}