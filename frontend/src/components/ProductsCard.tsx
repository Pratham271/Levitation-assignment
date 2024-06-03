import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, incrementQuantity, decrementQuantity } from '../reduxStore/cartSlice';
import { RootState } from '../reduxStore/store';

interface ProductProps {
  image: string;
  name: string;
  price: number;
  description: string;
}

const ProductsCard: React.FC<ProductProps> = ({ image, name, price, description }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === name)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ id: name, image, name, price, description }));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(name));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(name));
  };

  return (
    <div className="border rounded-md">
      <div className="bg-white flex justify-center">
        <div className="w-64 h-64">
          <img src={image} alt="photo" className="object-contain h-full w-full" />
        </div>
      </div>
      <div className="flex justify-center items-center mx-3 mt-6">
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <div className="px-2 flex justify-center">
        <p className="text-sm font-medium text-gray-400">
          {description[0].toUpperCase() + description.slice(1)}
        </p>
      </div>
      <div className="my-6 mx-3 flex justify-between items-center">
        <p>Price: ${price}</p>
        {cartItem ? (
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="bg-gray-800 text-white rounded-md px-3 py-1"
            >
              -
            </button>
            <span className="mx-2">{cartItem.quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-800 text-white rounded-md px-3 py-1"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-gray-800 text-white rounded-md px-3 py-1"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
