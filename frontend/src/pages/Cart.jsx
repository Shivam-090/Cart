import React, { useEffect } from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      dispatch(setCart(res.data));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      dispatch(setCart(res.data));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!items.length)
    return <div className='text-center mt-10 text-xl font-semibold'>Your cart is empty 🛍️</div>;

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-blue-700 text-center'>Your Cart</h1>

      <div className='space-y-4 mb-6'>
        {items.map((item) => (
          <div
            key={item.productId._id}
            className='flex justify-between items-center bg-white shadow p-4 rounded-lg'
          >
            <div>
              <p className='font-semibold'>{item.productId.name}</p>
              <p className='text-gray-600'>₹{item.productId.price} × {item.qty}</p>
            </div>

            <button
              onClick={() => removeItem(item.productId._id)}
              className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 className='text-xl font-bold text-center mb-6'>Total: ₹{total}</h2>

      <a
        href="/checkout"
        className='block bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold'
      >
        Proceed to Checkout
      </a>
    </div>
  );
}
