import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity, applyDiscount } from './cartSlice';

const Cart = () => {
  const { items, discount, taxRate } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = (subtotal + tax) * (1 - discount / 100);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center mb-4 p-2 border-b">
              <div className="flex-1">
                <span className="font-semibold">{item.name}</span>
                <span className="block text-sm text-gray-500">${item.price.toFixed(2)} per unit</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%):</label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => dispatch(applyDiscount(Number(e.target.value)))}
          className="mt-1 p-2 border rounded w-full"
          min="0"
          max="100"
        />
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({taxRate}%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>{discount}%</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;