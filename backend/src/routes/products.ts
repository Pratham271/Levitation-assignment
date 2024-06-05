import { Router } from "express";
import { Cart, Product, TempCart, User } from "../db";
import axios from "axios";
import puppeteer from "puppeteer";
import { authMiddleware, CustomRequest } from "../middlewares";
import jwt from "jsonwebtoken"
export const productsRouter = Router()


interface Product {
    title: string
    description: string
    price: number
    image: string

}

interface Cart{
    name: string,
    price: number,
    quantity: number
}


productsRouter.get("/addProducts", async(req,res) => {
    const products = await Product.find({})
    if(products.length===0){
        const response = await axios.get("https://fakestoreapi.com/products")
        const products = response.data
        products.slice(0,8).map(async(prod:Product) => {
            await Product.create({
                productName: prod.title,
                price: prod.price,
                description: prod.description,
                image: prod.image
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

productsRouter.get("/allProducts", async(req,res)=> {
    const products = await Product.find({})

    return res.status(200).json({
        products
    })
})

productsRouter.post("/tempCart", authMiddleware, async(req:CustomRequest, res) => {
    try {
        const token = req.token
        const body = req.body
        const decoded = jwt.decode(token!)
        
        if(decoded === null){
            return res.status(400).json({message: "User not authenticated"})
        }

        // @ts-ignore
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const tempCartProducts = body.items.map((product:Cart) => ({
            productName: product.name,
            quantity: product.quantity,
            price: product.price
        }));

        await TempCart.create({
            userId: user._id,
            date: body.date,
            products: tempCartProducts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({erroMessage: "Error adding items to cart"})
    }
})

productsRouter.post("/generatePDF", authMiddleware,async(req:CustomRequest,res)=> {
    try {

        const token = req.token
        const body = req.body
        const decoded = jwt.decode(token!)
        if(decoded === null){
            return res.status(400).json({message: "User not authenticated"})
        }
        // @ts-ignore
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message: "User not found"})

        }
        const cartProducts = body.items.map((product:Cart) => ({
            productName: product.name,
            quantity: product.quantity,
            price: product.price,
        }));

        await Cart.create({
            userId: user.id,
            validity: body.date,
            products: cartProducts
        })
        

        const browser = await puppeteer.launch({
            headless: false,
            devtools: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000
        });


        const page = await browser.newPage()

        await page.goto(body.url, {
            waitUntil: 'networkidle0'
        });
      
        const result = await page.pdf({
          format: 'a4',
        });
        await browser.close();

        return res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({erroMessage: "Error generating pdf"})
    }
})
