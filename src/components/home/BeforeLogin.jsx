import React from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
const BeforeLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('beforeLoginHeading')}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          {t('beforeLoginParagraph')}
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-green-700 font-semibold py-2 px-6 rounded hover:bg-green-100 transition"
        >
          {t('join')}
        </button>
      </section>

      {/* About Section1 */}
      <section className="py-12 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{t('beforeLoginSec1Heading')}</h2>
        <p className="text-lg text-gray-700">
         {t('beforeLoginSec1Paragraph')}
          </p>
      </section>

      {/* Features Section2 */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card */}
          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{t('beforeLoginSec2Cont1Heading')}</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont1Paragraph')}
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{t('beforeLoginSec2Cont2Heading')}</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont2Paragraph')}
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{t('beforeLoginSec2Cont3Heading')}</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont3Paragraph')}
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{t('beforeLoginSec2Cont4Heading')}</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont4Paragraph')}
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{t('beforeLoginSec2Cont5Heading')}</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont5Paragraph')}
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">beforeLoginSec2Cont6Heading</h3>
            <p className="text-gray-600">
              {t('beforeLoginSec2Cont6Paragraph')}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action section3 */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('beforeLoginSec3Heading')}</h2>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          {t('signup')}
        </button>
      </section>
    </div>
  );
};

export default BeforeLogin;
