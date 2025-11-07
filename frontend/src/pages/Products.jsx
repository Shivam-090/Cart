import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cart/cartSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const res = await api.post("/cart", { productId: id, qty: 1 });
      dispatch(setCart(res.data));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <div className='text-center mt-10 text-lg font-semibold'>Loading products...</div>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center text-blue-700'>🛒 VibeCart Products</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((p) => (
          <div key={p._id} className='bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between'>
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              className='w-full h-40 object-cover rounded-lg mb-3'
            />
            <h2 className='text-lg font-semibold mb-2'>{p.name}</h2>
            <p className='text-gray-700 mb-3'>₹{p.price}</p>
            <button
              onClick={() => handleAddToCart(p._id)}
              className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition'
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
