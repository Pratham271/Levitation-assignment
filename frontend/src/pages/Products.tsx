import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import axios from 'axios';
import BASE_URL from "../config";
import ProductsCard from "../components/ProductsCard";


type Product = {
  productName: string,
  price: number,
  description: string
  image: string

}

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(()=> {
    async function fetchProducts(){
      const response = await axios.get(`${BASE_URL}/product/allProducts`)
      setProducts(response.data.products)
    }
    fetchProducts()
  },[])
  return (
    <div>
        <Appbar/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-6 ">
        {
          products && products.map((p:Product, index) => (
              <ProductsCard image={p.image} name={p.productName} price={p.price} description={p.description} key={index}/>
            
          ))
        }
        </div>
    </div>
  )
}

export default Products
