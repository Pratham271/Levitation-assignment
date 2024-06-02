import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../db";
import {  signupMiddleWare } from "../middlewares";
import bcrypt from 'bcrypt';
import { signinSchema } from "../zod";
import { signinInputs } from "../types";
import dotenv from "dotenv"
dotenv.config()
const userRouter = Router();

userRouter.post("/signup", signupMiddleWare,async(req, res)=> {
    const { firstName,lastName,email,password } = req.body
    try {
        const hash = await bcrypt.hash(password,10)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hash
    })
    res.status(201).json({
        message: "User created successfully"
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating User"
        })

    }
})

userRouter.post("/signin",async(req,res)=> {
    const data:signinInputs = req.body
    try {
        const parsedData = signinSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        const user = await User.findOne({
            email: data.email
        })

        if(!user){
            return res.status(403).json({
                message: "Username does not exists"
            })
        }

        const verifyPass = await bcrypt.compare(user.password, data.password)
        if(!verifyPass){
            return res.status(411).json({message: "Wrong password"})
        }
        const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET!)
        return res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorMessage: "Not able to sign you in"
        })
    }
})

export default userRouter