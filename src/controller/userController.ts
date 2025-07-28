import { NextFunction,Request,Response } from "express";
import { UserModel } from "../model/User";
import { errorHandler } from "../middleware/errorHandle";
import jwt from 'jsonwebtoken';

export const saveUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log("User data received:...............................................");

    try {
        const newUser = new UserModel(req.body);
        console.log("New user created:", newUser);

        const existUser = await UserModel.findOne({ email: newUser.email });
        if (existUser) {
            console.log("User already exists..........................:");
            return res.status(200).json({
                message: "User already registered. Please login.",
                status: "400"
            });
        }

        const user = await newUser.save();
        console.log("User saved successfully:", user);

        return res.status(201).json({
            message: "User created successfully",
            status: "201"
        });

    } catch (err) {
        return errorHandler(err, req, res);
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

   try{ const {email}   = req.body;

    const user = await UserModel.findOne({email:email})
    if(!user){
        console.log("User Not Found")
    }

    return res.status(201).json({
        message : user,
        status:'201'
    })}catch(err){
        console.log(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log("User data received:", req.body);

    try {
        const { email, password } = req.body;

        const existUser = await UserModel.findOne({ email });

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
            { id: existUser._id, email: existUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '5h' }
        );

        return res.status(200).json({
            message:token,
            role: role,
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