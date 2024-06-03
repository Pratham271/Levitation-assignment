import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
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
        BillEase
      </div>
      <div className='flex items-center'>
        <button className="mr-6 text-white w-full px-3 py-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm"  onClick={()=> {
            localStorage.removeItem("token")
            navigate("/")
        }}>Logout</button>
        <button className='relative'><Cart/><p className='fixed top-3 right-2.5 text-xs bg-gray-900 text-white rounded-full px-[4px]'>{cartLength}</p></button>
      </div>
    </div>
  )
}

export default Appbar
