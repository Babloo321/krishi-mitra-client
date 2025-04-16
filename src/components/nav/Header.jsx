import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { AxiosPublic } from '../../api/axiosInstance.js';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
const Header = () => {
  const { user } = useAuth();
  const role = user.role;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false); // close dropdown after selection
    setMobileMenuOpen(false)
  };
  const handleClick = ()=>{
    setMobileMenuOpen(false);
  }
  const handleLogout = async () => {
    try {
      const response = await AxiosPublic.patch(
        '/user/logout',
        {}, // Empty body
        { withCredentials: true } // This goes as the third argument
      );
      const { message } = response.data;

      toast.success(message);
      navigate('/');
      // Optional delay to let toast show before logout and reload
      setTimeout(() => {
        logout(); // Clear auth info
        navigate('/');
      }, 2000);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || 'Something went wrong during logout!';
      toast.error(errMsg);
    }
  };

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo or App Icon */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-lg font-bold cursor-pointer"
        >
          <FaSeedling className="text-2xl" />
          <span className="md:inline">{t('krishi')}</span>
        </div>

        {/* Middle: Search bar (only on md and above) */}
        <div className="hidden md:flex items-center bg-white text-black px-3 py-1 rounded-full w-1/3">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* Right: Navigation links (only on md and above) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          {role === 'admin' ? (
            <Link to="/dashboard" className="hover:text-gray-200">
              {t('dashboard')}
            </Link>
          ) : (
            <>
              <Link to="/products" className="hover:text-gray-200">
                {t('product')}
              </Link>
              <Link to="/profile" className="hover:text-gray-200">
                {t('profile')}
              </Link>
              <Link to="/contact-us" className="hover:text-gray-200">
                {t('contact')}
              </Link>
            </>
          )}
          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex justify-center w-full px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded hover:bg-gray-600"
              >
                🌐 {t('language')}
              </button>
            </div>

            {open && (
              <div className="absolute z-10 mt-2 w-32 bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('hi')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-4 py-1 rounded hover:bg-black cursor-pointer"
          >
            Logout
          </button>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes className="cursor-pointer" /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pink-600/30 py-4 px-7 space-y-3">
          <div className="bg-white text-black px-3 py-2 rounded-full flex items-center">
            <FaSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent focus:outline-none"
            />
          </div>

          {role === 'admin' ? (
            <Link
             onClick={handleClick}
              to="/dashboard"
              className="block hover:text-white hover:px-4 hover:bg-green-700 shadow-md p-2 rounded-2xl"
            >
              {t('dashboard')}
            </Link>
          ) : (
            <>
            <Link
             onClick={handleClick}
                to="/products"
                className="block hover:text-white hover:px-4 hover:bg-green-700 shadow-md p-2 rounded-2xl"
              >
                {t('product')}
              </Link>

              <Link
               onClick={handleClick}
                to="/profile"
                className="block hover:text-white hover:px-4 hover:bg-green-700 shadow-md p-2 rounded-2xl"
              >
                {t('profile')}
              </Link>

              <Link
               onClick={handleClick}
                to="/contact-us"
                className="block hover:text-white hover:px-4 hover:bg-green-700 shadow-md p-2 rounded-2xl"
              >
                {t('contact')}
              </Link>
            </>
          )}

          <div className="relative inline-block text-left w-full">
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex justify-center w-full px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded hover:bg-pink-900 cursor-pointer"
              >
                🌐 {t('language')}
              </button>
            </div>

            {open && (
              <div className="absolute z-10 mt-2 w-32 bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('hi')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-700 text-white px-4 py-1 hover:bg-black cursor-pointer rounded-[4px]"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
