// pages/AdminDashboard.jsx
import React,{useEffect, useState} from 'react';
import FarmerTable from '../../pages/admin/FarmerTable.jsx';
import BuyerTable from '../../pages/admin/FarmerTable.jsx';
import ProductManager from '../../pages/admin/ProductManager.jsx';
import AddProduct from '../../pages/admin/AddProduct.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
const AdminDashboard = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [activeTab, setActiveTab] = useState(data || 'farmer');
  useEffect(()=>{
    if(data){
      setActiveTab(data)
    }
  },[]);
  const tabs = [
    { id: 'farmer', label: 'Farmer Table' },
    { id: 'buyer', label: 'Buyer Table' },
    { id: 'product', label: 'Product Manager' },
    {id: 'add', label:'Add Product'}
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case 'buyer':
        return <BuyerTable />;
      case 'product':
        return <ProductManager />;
      case 'add':
        return <AddProduct />
      default:
        return <FarmerTable />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-tr from-purple-100 via-blue-50 to-white min-h-screen">
      {/* Header Tabs */}
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:scale-105 cursor-pointer
              ${activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Component Container */}
      <div className="container mx-auto max-w-6xl p-4 bg-white rounded-xl shadow-xl transition-all duration-500 ease-in-out">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {renderComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
export default AdminDashboard;
