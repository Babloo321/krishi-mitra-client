import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './rtk/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './i18n'; // ⬅️ import i18n setup
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import CheckAuthProvider from './utils/AuthProvider.jsx';
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <BrowserRouter>
      <Provider store={store}>
        <CheckAuthProvider>
          <App />
        </CheckAuthProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
