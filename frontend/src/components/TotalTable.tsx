import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";


const TotalTable = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate the total price of items in the cart
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate GST (18% of total)
  const gst = total * 0.18;

  // Calculate grand total (total + GST)
  const grandTotal = total + gst;
  return (
    <div className="relative overflow-x-auto w-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Total
                    </th>
                    <th scope="col" className="pl-44 py-3">
                        ${total.toFixed(2)}
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        GST
                    </th>
                    <td className="pl-44 py-4">
                        18%
                    </td>
                    
                </tr>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        Grand total
                    </th>
                    <td className="pl-44 py-4">
                        ${grandTotal.toFixed(2)}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TotalTable
