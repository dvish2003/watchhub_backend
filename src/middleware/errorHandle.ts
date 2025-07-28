import {NextFunction,Request,Response} from "express";
import mongoose from "mongoose";
import {APIError} from "../error/ApiErrors";

export const errorHandler = (
    err:any,
    req:Request,
    res:Response
) =>{
    if(err instanceof mongoose.Error){
        res.status(400).json({
            
            message: err.message
        }
    );

    }
    else if(err instanceof APIError){
        res.status(err.statusCode).json({
            message: err.message
        });
    } else {
        console.error("Unexpected error:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }


}