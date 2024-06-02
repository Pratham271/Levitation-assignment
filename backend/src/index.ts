import express from "express";
import cors from "cors";
const app = express()

app.use(express.json())
app.use(cors())


app.listen(3000, ()=> {
    console.log("App started listening on port 3000")
})
