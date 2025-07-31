import { NextFunction,Request,Response } from "express";
import { errorHandler } from "../middleware/errorHandle";
import jwt from 'jsonwebtoken';
import prisma from "../config/prisma";
import { error } from "node:console";

export const saveUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
try{
        const existUser = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });

    if (existUser) {
        return res.status(200).json({
            message: "User already registered. Please login.",
            status: "400"
        });
    }

  
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        }
    })
          return res.status(201).json({
            message: "User created successfully",
            status: "201",
            user: newUser
        });
 } catch (err:any) {
        return errorHandler(err, req, res, next);
    }
    
  
}


export const update = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}
export const getUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}
export const getAllUsers = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}
export const getUserById = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}


export const getUserByEmail = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
//     console.log("User data received:", req.body);

//    try{ const {email}   = req.body;

//     const user = await UserModel.findOne({email:email})
//     if(!user){
//         console.log("User Not Found")
//     }

//     return res.status(201).json({
//         message : user,
//         status:'201'
//     })}catch(err){
//         console.log(err)
//     }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log("User data received:", req.body);

    try {
        const { email, password } = req.body;

        const existUser = await prisma.user.findUnique({
            where:{
            email:email
        }});

        const role = existUser?.role;
        if (!existUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        if (existUser.password !== password) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: existUser.id, email: existUser.email,role:role },
            process.env.JWT_SECRET as string,
            { expiresIn: '5h' }
        );

        return res.status(200).json({
            message:token,
            status: 200
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
};