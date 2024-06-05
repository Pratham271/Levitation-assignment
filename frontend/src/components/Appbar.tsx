import { Link, useNavigate } from 'react-router-dom';
import CartLogo from './CartLogo';
import {  useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';
import axios from 'axios';
import BASE_URL from '../config';


const Appbar = () => {
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.items);
    
    const cartLength = useSelector((state: RootState) =>
    state.cart.items.length
  );

  const addtoCart = async() => {
    try {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate =  `${day}/${month}/${year}`;
      const res = await axios.post(`${BASE_URL}/product/addtoCart`, 
              {
                  date: formattedDate,
                  items: cartItems
              },
              {
                  headers: {
                      authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              }
          );
      if(res.status === 200){
        navigate("/cart")
      }
      else{
        alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="bg-white w-full shadow flex justify-between items-center px-6 py-2.5">
      <div className="font-bold text-xl">
        <Link to={"/products"}>BillEase</Link>
      </div>
      <div className='flex items-center'>
        <button className="mr-6 text-white w-full px-3 py-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm"  onClick={()=> {
            localStorage.removeItem("token")
            navigate("/")
        }}>Logout</button>
        <button className='relative' onClick={addtoCart}><CartLogo/><p className='absolute top-[-3px] right-[-10px] text-xs bg-gray-900 text-white rounded-full px-[4px]'>{cartLength}</p></button>
      </div>
    </div>
  )
}

export default Appbar
