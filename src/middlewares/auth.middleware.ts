import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response.js";
import { getUserByIdService } from "../services/auth.service.js";
import { decodeToken } from "../utils/jwt.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return response({ res, status: 401, message: 'Missing token' });
    }

    try {
        const decoded = decodeToken(token);
        if (!decoded) {
            return response({ res, status: 401, message: 'Invalid token' });
        }
        const user = await getUserByIdService(decoded.id);
        if (!user) {
            return response({ res, status: 401, message: 'Invalid token' });
        }
        req.user_id = decoded.id;
        req.email = user.email;
        req.firstname = user.firstname;
        req.lastname = decoded.lastname;
        req.fullname = decoded.fullname;
        req.role = decoded.role;
        next();
    } catch (error: unknown) {
        response({ res, status: 500, message: 'Internal server error', errors: error });
    }
};
