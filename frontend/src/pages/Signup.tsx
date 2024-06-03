import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import BASE_URL from "../config";
import Quote from "../components/Quote";
import Auth from "../components/Auth";


const Signup = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get(`${BASE_URL}/user/me`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response)=> {
            if(response.status===200){
              navigate("/products")
            }
            else{
              alert("Not Authorized")
            }
          })
          .catch((e)=> {
            console.log(e)
          })
    }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signup"/>
      </div>
      <div className="hidden lg:block">
        <Quote/>
      </div>
    </div>
  )
}

export default Signup
