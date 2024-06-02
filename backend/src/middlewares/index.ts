import { NextFunction, Request, Response } from "express"
import {  signupSchema } from "../zod"
import { User } from "../db"
import { signupInputs } from "../types"


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
