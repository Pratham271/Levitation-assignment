import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../db";
import {  authMiddleware, CustomRequest, signupMiddleWare } from "../middlewares";
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

        const verifyPass = await bcrypt.compare(data.password, user.password)
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

userRouter.get("/me", authMiddleware, async(req:CustomRequest,res)=> {
    try {
        const token = req.token
        const decoded = jwt.decode(token!)
        if(decoded!==null){
            const user = await User.findOne({
            // @ts-ignore
            _id: decoded.id
        })
        return res.status(200).json({
            message: "Your token is valid",
            firstName: user?.firstName
        }) 
    }
    return res.status(400).json({
        message: "Enter a valid token"
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "something went wrong"})
    }
    

})

export default userRouter