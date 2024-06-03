import axios from "axios"
import { useEffect } from "react"
import BASE_URL from "../config"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectPdfUrl } from "../reduxStore/pdfSlice";


const Pdf = () => {
  

  
  
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get(`${BASE_URL}/user/me`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response)=> {
            
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
    const pdfUrl = useSelector(selectPdfUrl);
    console.log(pdfUrl)
  return (
    <div className='h-screen'>
      {pdfUrl ? (
        <object data={pdfUrl} type="application/pdf" width="100%" className='h-screen'>
          <p>Sorry, your browser doesn't support embedded PDFs.</p>
        </object>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  )
}

export default Pdf
