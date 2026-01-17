import jwt from 'jsonwebtoken';
import "dotenv/config";

export interface MyJwtPayload {
    id: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    role: string
    iat?: number;
    exp?: number;
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export const generateToken = (payload: MyJwtPayload): string => {
    return jwt.sign({
        id: payload.id,
        firstname: payload.firstname,
        lastname: payload.lastname,
        fullname: payload.fullname,
        email: payload.email,
        role: payload.role
    },
        JWT_SECRET_KEY, { expiresIn: '7d' }
    );
};

export const decodeToken = (token: string): MyJwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY) as MyJwtPayload;
    } catch {
        return null;
    }
};