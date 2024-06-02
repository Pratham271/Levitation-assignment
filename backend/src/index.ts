import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./routes/user";
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)

app.listen(3000, ()=> {
    console.log("App started listening on port 3000")
})
