import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string
export const authenticate = (req:Request,res:Response ,next:NextFunction) =>{
    const authHeader = req.headers.authorization

    console.log("authheader : ",authHeader)

    if(!authHeader){
        return res.status(401).json({
            message : "token header missing"
        })
    }

    const token = authHeader.split('')[1];

    if(!token){
        return res.status(401).json({
            message : 'token is missing'
        })
    }

    try{
        const decode = jwt.verify(token,SECRET);
        (req as any).user = decode;
        console.log("Authetication passes")
        next();
    }catch(err){
        return res.status(401).json({
            message : 'Unauthorize token'
        })
    }
    
}