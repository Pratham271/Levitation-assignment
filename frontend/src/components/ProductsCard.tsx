
interface productProps {
    image: string
    name: string
    price: number
    description: string
}
const ProductsCard = ({image, name, price, description}:productProps) => {
  return (
    <div className="border rounded-md">
        <div className="bg-white flex justify-center">
            <div className="w-64 h-64">
                <img src={image} alt="photo" className="object-contain h-full w-full"/>
            </div>
        </div>
        <div className="flex justify-center items-center mx-3 mt-6">
            <p className="font-semibold text-lg">{name}</p>
        </div>
        <div className="px-2 flex justify-center">
            <p className="text-sm font-medium text-gray-400">{description[0].toUpperCase() + description.slice(1)}</p>
        </div>
        <div className="my-6 mx-3 flex justify-between items-center">
            <p>Price: ${price}</p>
            <button className="bg-gray-800 text-white rounded-md px-3 py-1">Add to cart</button>
        </div>
    </div>

  )
}

export default ProductsCard
