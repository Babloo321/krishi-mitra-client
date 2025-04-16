import React, { useEffect, useState } from 'react';
import { AxiosPublic } from '../../api/axiosInstance.js';
const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await AxiosPublic.get('https://krishi-mitra-backend-1.onrender.com/api/v2/product/getProducts',{withCredentials:true});
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="w-full mx-auto overflow-hidden bg-gray-100 rounded-xl py-4 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Our Products</h2>

      <div className="relative h-[500px] flex justify-center items-center">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`absolute transition-transform duration-1000 ease-in-out w-full ${
              index === current ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
