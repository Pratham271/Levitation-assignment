import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';



const DataTable = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems)
  return (
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item,index) => (
                    <tr className="bg-white" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {item.name}
                    </th>
                    <td className="px-6 py-4">
                        {item.quantity}
                    </td>
                    <td className="px-6 py-4">
                        ${item.price}
                    </td>
                    <td className="px-6 py-4">
                        ${item.quantity * item.price}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>

  )
}

export default DataTable
