import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getAllProducts } from '../../api/product.api.js';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AxiosPrivate = useAxiosPrivate();
  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(AxiosPrivate);
        setProducts(await response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div 
      className="text-center text-white font-bold text-xl">
        {' '}

        products are Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 py-12 overflow-x-hidden bg-blue-900">
      {products.map((product) => (
        <div
          key={product._id}
          className="border border-white rounded-lg shadow-lg overflow-hidden p-[2px] bg-green-700"
        >
          {/* Product Image */}
          <img
            src={product.image} // Assuming image is an array and taking the first image
            alt={product.name}
            className="w-90 h-48 object-cover rounded-lg"
          />

          {/* Product Details */}
          <div className="p-4 flex flex-col gap-1 w-90">
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="text-lg font-bold text-red-500">₹{product.price}</p>
            <p className="text-sm text-gray-200">
              {product.brand} | {product.productType}
            </p>
            <p className="text-sm text-gray-200">
              {product.color} | Expiry: {product.expiry}
            </p>

            <p className="mt-2 text-sm text-gray-100">{product.description}</p>
            <div className='flex justify-around items-center mt-2'>
              <button className='py-1 px-6 bg-red-400 rounded-md text-white text-2xl font-bold text-center cursor-pointer hover:bg-blue-700'>Buy</button>
              <button className='py-1 px-6 bg-blue-400 rounded-md text-white text-2xl cursor-pointer hover:bg-black '>Add to Card</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
