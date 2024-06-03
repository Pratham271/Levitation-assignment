import { Router } from "express";
import { Product } from "../db";
import axios from "axios";
import puppeteer from "puppeteer";

export const productsRouter = Router()


interface Product {
    title: string
    description: string
    price: number
    image: string

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

productsRouter.post("/generatePDF", async(req,res)=> {
    try {
        const {url}= req.body
        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        await page.goto(url, {
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