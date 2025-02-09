import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

const products = [
  { id: 1, name: 'Product 1', price: 10, image: '/assets/real.jpeg' },
  { id: 2, name: 'Product 2', price: 20, image: '/assets/chelsea.jpeg' },
  { id: 3, name: 'Product 3', price: 30, image: '/assets/raja.jpg' },
];

const Products = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg text-center">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => dispatch(addItem(product))}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;