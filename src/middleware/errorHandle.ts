import {NextFunction,Request,Response} from "express";
import prisma from "../config/prisma";
import {APIError} from "../error/ApiErrors";

export const errorHandler = (
    err: APIError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error occurred:", err);
    
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            message: err.message,
            status: err.statusCode
        });
    }

    return res.status(500).json({
        message: "Internal Server Error",
        status: 500
    });
}