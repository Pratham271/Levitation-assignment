import { Link, useNavigate } from 'react-router-dom';
import CartLogo from './CartLogo';
import {  useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';


const Appbar = () => {
    const navigate = useNavigate()
    const cartLength = useSelector((state: RootState) =>
    state.cart.items.length
  );
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
        <button className='relative' onClick={()=> navigate("/cart")}><CartLogo/><p className='absolute top-[-3px] right-[-10px] text-xs bg-gray-900 text-white rounded-full px-[4px]'>{cartLength}</p></button>
      </div>
    </div>
  )
}

export default Appbar
