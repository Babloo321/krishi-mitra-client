import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosPublic } from '../../api/axiosInstance.js';
import useAuth from '../../hooks/useAuth.js';
const Signup = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [googleUserData, setGoogleUserData] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
  });
  const [picture, setPicture] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('userName', formData.userName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);

    if (picture) {
      data.append('picture', picture);
    } else {
      toast.error('Please upload a profile picture');
      return;
    }

    try {
      const res = await AxiosPublic.post(
        '/user/register',
        data,
      );
      toast.success('Signup successful!');
      navigate('/login');
    } catch (error) {
      const status = error.response?.status;
      if(status === 409){
        toast.error("user with this email is already exist");
        return;
      }else{
        toast.info("Network Error");
      }
    }
  };

  const googleAuthLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const googleUser = await res.json();

        // Save user data temporarily and open modal
        setGoogleUserData(googleUser);
        setShowRoleModal(true); // Show modal
      } catch (error) {
        toast.error(error.message || 'Google login failed');
      }
    },
    onError: () => toast.error('Google Login Failed'),
  });

  const handleRoleSelect = async (role) => {
    try {
      const response = await AxiosPublic.post(
        '/user/google-auth',
        {
          email: googleUserData.email,
          name: googleUserData.name,
          picture: googleUserData.picture,
          role,
        },
      );
      toast.success('Signed up with Google!');
      setShowRoleModal(false);
      navigate('/login');
    } catch (error) {
      const errCode = error?.response?.status;
      if(errCode === 409){
        toast.error('User With this email already exits');
        navigate("/login");
      }else{
        toast.error(errMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 fancy-gradient">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Universal Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
          <label htmlFor="picture" className="w-full pb-2">
            Profile Image
          </label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <div className="p-2">
          <span>
            Already! Have an Account?{' '}
            <Link to="/login" className="ml-1 text-red-500 font-bold">
              Login
            </Link>{' '}
          </span>
        </div>
        <div className="my-4 text-center text-gray-500">or</div>

        <button
          onClick={googleAuthLogin}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign Up with Google</span>
        </button>
      </div>

      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Select your role</h2>
            <div className="flex justify-between gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                onClick={() => handleRoleSelect('farmer')}
              >
                Farmer
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                onClick={() => handleRoleSelect('buyer')}
              >
                Buyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
