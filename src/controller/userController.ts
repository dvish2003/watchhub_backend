import { NextFunction,Request,Response } from "express";
import { UserModel } from "../model/User";
import { errorHandler } from "../middleware/errorHandle";

export const saveUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try{
    const newUser = new UserModel(req.body);
    console.log("New user created:", newUser);
    
     
    const existUser = await UserModel.findOne({email:newUser.email});
    if(existUser){
        return res.status(400).json({
            message: "User already registered. Please login.",
        });
    }

   
    const user = await newUser.save();
        console.log("User saved successfully:", user);
        res.status(201).json({
            message: "User created successfully",
            status:"201"
        })

    }catch(err){
        errorHandler(err, req, res);
        return;
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
    console.log("User data received:", req.body);
}

export const login = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    console.log("User data received:", req.body);
}