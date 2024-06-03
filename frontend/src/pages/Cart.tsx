import axios from "axios"
import { useEffect } from "react"
import BASE_URL from "../config"
import { useNavigate } from "react-router"
import Appbar from "../components/Appbar"


const Cart = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get(`${BASE_URL}/user/me`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response)=> {
            console.log(response)
            if(response.status===200){
              
            }
            else{
              navigate("/")
            }
            
          })
          .catch((e)=> {
            console.log(e)
            navigate("/")
          })
    },[])
  return (
    <div>
        <Appbar/>
      Hello from cart
    </div>
  )
}

export default Cart
