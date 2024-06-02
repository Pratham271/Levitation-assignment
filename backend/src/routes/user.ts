import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../db";

const userRouter = Router();

userRouter.post("/signup", async(req, res)=> {
    console.log("hello from signup")
})

export default userRouter