import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPublic } from '../../api/axiosInstance.js';
import { toast } from 'react-toastify';
const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    productType: '',
    color: '',
    maxShelfLife: '',
    nutrientContent: '',
    countryOfOrigin: '',
    quantity: '',
    expiry: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);

      const res = await AxiosPublic.post("/product/addProduct",data,{withCredentials:true});
      const status = res.data?.statusCode;
      if(status == "201"){
        const msg = (res.data?.message || 'Product added successfully')
        toast.success(msg);
        setFormData({});
        setImage(null);
        navigate('/dashboard', {
          state: { data: 'Product Manager' }
        });
      }
    } catch (err) {
      const status = err.response?.status;
      if(status === '409'){
        toast.error(err.response?.data?.message || 'Error adding product');
      }else if(status >=500){
        toast.error("Network Error");
      }else{
        toast.error("Something went wrong while creating Product")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ['name', 'Product Name'],
          ['price', 'Price'],
          ['brand', 'Brand'],
          ['productType', 'Product Type'],
          ['color', 'Color'],
          ['maxShelfLife', 'Max Shelf Life'],
          ['nutrientContent', 'Nutrient Content'],
          ['countryOfOrigin', 'Country of Origin'],
          ['quantity', 'Quantity'],
          ['expiry', 'Expiry Date']
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
            <input
              type={name === 'price' || name === 'quantity' ? 'number' : name === 'expiry' ? 'date' : 'text'}
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={['name', 'price', 'brand', 'productType', 'color', 'expiry'].includes(name)}
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-300"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
