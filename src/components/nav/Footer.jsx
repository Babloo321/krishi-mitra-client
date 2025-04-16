import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-green-800 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">{t('krishi')}</h2>
          <p className="text-sm text-gray-200">
            {t('footerContent')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/profile" className="hover:underline">Profile</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/apply" className="hover:underline">Apply for Seeds/Fertilizers</Link></li>
            <li><Link to="/sell" className="hover:underline">Sell Your Product</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-sm text-gray-200">Email: support@Krishi-Mitra.com</p>
          <p className="text-sm text-gray-200">Phone: +91 12345 67890</p>
          <div className="flex mt-3 space-x-4 text-white text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Krishi-Mitra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
