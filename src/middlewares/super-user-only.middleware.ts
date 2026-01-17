import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response.js";

export const superUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.role || req.role != "super_user") {
            return response({ res, status: 403, message: 'Forbidden' });
        }
        next();
    } catch (error: unknown) {
        response({ res, status: 500, message: 'Internal server error', errors: error });
    }
};