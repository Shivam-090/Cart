import React, { useState } from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async () => {
    try {
      const res = await api.post("/cart/checkout", { cartItems: items });
      setReceipt({ ...res.data, name, email });

      dispatch(setCart({ items: [], total: 0 }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!items.length)
    return <div className='text-center mt-10 text-xl font-semibold'>No items to checkout.</div>;

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-center text-blue-700'>Checkout</h1>

      <div className='space-y-3 mb-6'>
        <input
          type="text"
          placeholder="Your name"
          className='border p-3 w-full rounded-lg'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          className='border p-3 w-full rounded-lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        onClick={handleCheckout}
        className='bg-green-600 hover:bg-green-700 w-full py-3 text-white rounded-lg font-semibold'
      >
        Submit Order
      </button>

      {receipt && (
        <div className='mt-8 border rounded-lg bg-white shadow p-6'>
          <h2 className='text-xl font-bold mb-2 text-center text-green-700'>Receipt</h2>
          <p><b>Name:</b> {receipt.name}</p>
          <p><b>Email:</b> {receipt.email}</p>
          <p><b>Total:</b> ₹{receipt.total}</p>
          <p><b>Timestamp:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
