import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { useTranslation } from 'react-i18next';
import ProductSlider from "./ProductSlider.jsx";
const AfterLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { t } = useTranslation();
  const handleNavigation = () =>{
    if(user.role === 'farmer'){
      navigate("/farmer-info/form")
    }else if(user.role === 'buyer'){
      navigate("/buyer-info/form")
    }
  }
  return (
    <div className="min-h-screen bg-blue-900 py-10 px-4 md:px-10">
      <div className="max-w-6xl md:max-w-full mx-auto space-y-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-300">
          {t('welcome')}
        </h1>
        <p className="text-center text-white text-3xl font-semibold">
          {t('heading')}
        </p>

        {/* Our Mission */}
        <section className="bg-white rounded-xl shadow p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌾 {t('mission')}</h2>
          <p className="text-gray-700">
            {t('missionContent')}
          </p>
        </section>

      {/* product slider */}
      <section>
        <ProductSlider/>
      </section>

        {/* Services Section */}
        <section className="bg-white rounded-xl shadow p-6 md:p-10 space-y-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚜 {t('service')}</h2>

          {/* Farmers */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">{t('farmer')}</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>{t('farmerService1')}</li>
              <li>{t('farmerService2')}</li>
              <li>{t('farmerService3')}</li>
              <li>{t('farmerService4')}</li>
              <li>{t('farmerService5')}</li>
              
               </ul>
          </div>

          {/* Buyers */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">{t('buyer')}</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
             <li>{t('buyerService1')}</li>
             <li>{t('buyerService2')}</li>
              </ul>
          </div>

          {/* Admin */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">{t('adminHelp')}</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>{t('adminHelp1')}</li>
              <li>{t('adminHelp2')}</li>
              <li>{t('adminHelp3')}</li>
              <li>{t('adminHelp4')}</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        {
          !user.role &&   <section className="bg-green-600 text-white text-center rounded-xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🌱 {t('farmerFormContHeading')}</h2>
          <p className="mb-4">
          {t('farmerFormContParagraph')}
          </p>
          <button 
          onClick={handleNavigation}
          className="bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-green-100 transition">
            {t('apply')}
          </button>
        </section>
        }
       
      </div>
    </div>
  );
};

export default AfterLogin;
