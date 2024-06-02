import { Router } from "express";
import { Product } from "../db";
import axios from "axios";

export const productsRouter = Router()


interface Product {
    title: string
    description: string
    price: number
}
productsRouter.get("/addProducts", async(req,res) => {
    const products = await Product.find({})
    if(products.length===0){
        const response = await axios.get("https://fakestoreapi.com/products")
        const products = response.data
        products.map(async(prod:Product) => {
            await Product.create({
                productName: prod.title,
                price: prod.price,
                description: prod.description
            })
        })

        return res.status(201).json({
            message: "Products added successfully"
        })
    }
    return res.status(400).json({
        message: "Products are already there"
    })
    
})