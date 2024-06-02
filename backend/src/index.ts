import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import { productsRouter } from "./routes/products";

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productsRouter)

app.listen(3000, ()=> {
    console.log("App started listening on port 3000")
})
