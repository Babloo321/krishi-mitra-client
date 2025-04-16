import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://krishi-mitra-backend-1.onrender.com/api/v2/admin/get/allUsers", { withCredentials: true });
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-10 animate-fade-in-down">All Users Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, i) => (
          <div key={i} className="bg-white shadow-xl rounded-2xl p-5 transition-transform hover:scale-105 hover:shadow-2xl duration-300">
            <img
              src={user.picture || "https://via.placeholder.com/100"}
              alt={user.userName}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-300 object-cover"
            />
            <h2 className="text-lg font-semibold text-center">{user.userName}</h2>
            <p className="text-center text-sm text-gray-600">{user.email}</p>

            {/* Future Loan Info Section */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><span className="font-semibold">Loan:</span> ₹{user.loan ?? "N/A"}</p>
              <p><span className="font-semibold">Interest:</span> {user.interest ?? "N/A"}%</p>
              <p><span className="font-semibold">Paid Amount:</span> ₹{user.payAmount ?? "N/A"}</p>
              <p><span className="font-semibold">Payable Amount:</span> ₹{user.payAbleAmount ?? "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
