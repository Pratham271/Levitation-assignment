import axios from "axios"
import { useEffect } from "react"
import BASE_URL from "../config"
import { useNavigate } from "react-router"
import DataTable from "../components/DataTable"
import TotalTable from "../components/TotalTable"



const Cart = () => {
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
    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const today = new Date();
    const formattedDate = formatDate(today);
  return (
    <div>
        <div className="flex justify-between m-12 items-center">
            <div>
                <div>
                    <h1 className="font-semibold text-2xl">Invoice Generator</h1>
                </div>
                <div>
                    <p className="text-base text-gray-500 mt-1">Generate Invoices in seconds</p>
                </div>
            </div>
            <div className="mr-6 flex flex-col items-center justify-center">
                <div className="flex items-center">
                    <img src="bill.png" alt="" height={40} width={40} className="mr-3 "/>
                    <h1 className="font-semibold text-xl">BillEase <br />
                    <p className="text-sm font-light text-gray-500 mt-0.5">infotech</p>
                    </h1>
                </div>
            </div>
        </div>
        <div >
            <DataTable/>
            <div className="flex justify-end mr-52  my-3">
                <TotalTable/>
            </div>
        </div>
        <div className="flex justify-between ml-6 mt-40 text-gray-600 text-md font-light items-center">
           <div>
            <span className="text-gray-400">valid until: &nbsp;</span> {formattedDate}
           </div>
           <div className="mr-6 flex items-center">
            <button className="text-sm bg-gray-900 text-gray-100 rounded-md px-3 py-1 hover:bg-gray-800">Generate PDF</button>
           </div>
        </div>
    </div>
  )
}

export default Cart
