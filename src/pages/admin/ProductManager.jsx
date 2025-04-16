import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4040/api/v2/product/getProducts', { withCredentials: true });
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditedProduct({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleChange = (e) => {
    setEditedProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setProducts((prev) =>
        prev.map((p) => (p._id === editingId ? { ...p, ...editedProduct } : p))
      );
      toast.success('Product updated');
      handleCancel();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4040/api/v2/product/delete/${id}`, {
        withCredentials: true,
      });
      console.log("res: ",res)
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
      toast.success('Product deleted');
    } catch (error) {
      toast.error('Failed to Delete Product');
    }
  };
  
  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentIds = currentProducts.map((p) => p._id);
    if (selectAll) {
      setSelectedProducts((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedProducts((prev) => [...new Set([...prev, ...currentIds])]);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedProducts.length === 0) return;
  
      const idsParam = selectedProducts.join(',');
      const res = await axios.delete(`http://localhost:4040/api/v2/product/delete/${idsParam}`, {
        withCredentials: true,
      });
      console.log("res: ",res);
  
      setProducts((prev) => prev.filter((p) => !selectedProducts.includes(p._id)));
      toast.success('Selected products deleted');
      setSelectedProducts([]);
      setSelectAll(false);
    } catch (error) {
      toast.error('Delete failed');
    }
  };
  

  // Pagination
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const changePage = (page) => setCurrentPage(page);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 animate-fade-in-down">
        Manage Products
      </h2>

      {/* Select All & Delete Selected */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 ">
          <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className='cursor-pointer'/>
          <label className="font-medium text-gray-700 cursor">Select All</label>
        </div>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedProducts.length === 0}
          className={`btn px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer ${
            selectedProducts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Delete Selected ({selectedProducts.length})
        </button>
      </div>

      <div className="grid gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-pink-900 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})`, minHeight: '200px' }}
          >
            <input
              type="checkbox"
              checked={selectedProducts.includes(product._id)}
              onChange={() => handleSelect(product._id)}
              className="absolute top-3 left-3 scale-125"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-6">
              {editingId === product._id ? (
                <>
                  {/* Editable Fields */}
                  {['name', 'price', 'description', 'brand', 'color', 'maxShelfLife', 'quantity', 'expiry'].map((field) => (
                    <div key={field} className="text-white">
                      <span><strong>{field}:</strong></span>
                      <input
                        type={field === 'expiry' ? 'date' : field === 'quantity' ? 'number' : 'text'}
                        name={field}
                        placeholder={field}
                        value={editedProduct[field] || ''}
                        onChange={handleChange}
                        className="input border-[1px]"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-white"><strong>Name:</strong> {product.name}</p>
                  <p className="text-white"><strong>Price:</strong> ₹{product.price}</p>
                  <p className="text-white"><strong>Description:</strong> {product.description}</p>
                  <p className="text-white"><strong>Brand:</strong> {product.brand}</p>
                  <p className="text-white"><strong>Color:</strong> {product.color}</p>
                  <p className="text-white"><strong>Shelf Life:</strong> {product.maxShelfLife}</p>
                  <p className="text-white"><strong>Quantity:</strong> {product.quantity}</p>
                  <p className="text-white"><strong>Expiry:</strong> {product.expiry}</p>
                </>
              )}
            </div>

            <div className="flex gap-4 justify-end mt-4">
              {editingId === product._id ? (
                <>
                  <button onClick={handleSave} className="btn bg-green-500 hover:bg-green-600 text-white cursor-pointer">Save</button>
                  <button onClick={handleCancel} className="btn bg-gray-400 hover:bg-gray-500 text-white cursor-pointer">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(product)} className="btn bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="btn bg-red-500 hover:bg-red-600 text-white cursor-pointer">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full shadow transition-all ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <div className="text-lg font-semibold text-gray-700">Page {currentPage} of {totalPages}</div>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full shadow transition-all ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManager;
