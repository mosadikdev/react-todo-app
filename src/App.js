import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Products from './features/products/Products';
import Cart from './features/cart/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart App</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Products />
            </div>
            <div>
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;