import { json, NextFunction, Request, Response } from "express"
import {  signupSchema } from "../zod"
import { User } from "../db"
import { signupInputs } from "../types"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
export interface CustomRequest extends Request {
    token?: string;
  }

export const signupMiddleWare = async(req:Request,res:Response,next:NextFunction) => {
    const data:signupInputs = req.body

    try {
        const parsedData= signupSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        const user = await User.findOne({email: data.email})

        if(user){
            res.status(403).json({
                message: "Email already exists"
            })
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: "Something went wrong"
        })
    }
}

export const authMiddleware = async(req:CustomRequest,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization
    try {
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(411).json({
                message: "Incorrect token"
            });
        }

        const words = authHeader.split(" ")
        const token = words[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET!)
        if(!verified){
            return res.status(411).json({
                message: "Invalid token"
            });
        }
        req.token = token
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
