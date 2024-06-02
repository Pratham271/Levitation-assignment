import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../db";
import { signupMiddleWare } from "../middlewares";
import bcrypt from 'bcrypt';

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

export default userRouter