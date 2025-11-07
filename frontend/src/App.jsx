import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/products";
import Checkout from "./pages/Checkout"
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";

function CartBadge() {
  const items = useSelector((state) => state.cart.items);
  const qty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <span className='bg-white text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold'>
      {qty}
    </span>
  );
}

export default function App() {
  return (

    
    <BrowserRouter>
      <nav className='bg-blue-700 text-white px-6 py-4 flex justify-between items-center'>
  <h1 className='font-bold text-xl'>VibeCart</h1>

  <div className='space-x-4 flex items-center'>
    <Link to='/' className='hover:underline'>
      Products
    </Link>

    <Link to='/cart' className='hover:underline flex items-center gap-1'>
      Cart
      <CartBadge />
    </Link>
  </div>
</nav>


      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
