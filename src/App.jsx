import Signup from "./components/auth/Signup"
import Login from "./components/auth/LogIn"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from './utils/Protected.Route.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/home/Home.jsx";
import Header from "./components/nav/Header.jsx";
import Footer from "./components/nav/Footer.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
// import Dashboard from './pages/dashboard/Dashboard.jsx'
import FarmerDetailsForm from "./pages/farmer/FarmerDetailsForm.jsx";
import BuyerDetailsForm from "./pages/buyer/BuyerDetails.jsx";
import Profile from "./components/profile/Profile.jsx";
import Product from "./components/product/Products.jsx";
import Contact from './components/contact/Contact.jsx';
import useAuth from "./hooks/useAuth.js";
function App() {
  const { token } = useAuth();
  return (
    <div className="min-h-auto h-screen w-full overflow-hidden overflow-y-auto">
    { token && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/contact-us" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/farmer-info/form" element={<ProtectedRoute><FarmerDetailsForm /></ProtectedRoute>} />
        <Route path="/buyer-info/form" element={<ProtectedRoute><BuyerDetailsForm /></ProtectedRoute>} />
      </Routes>
    { token && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="colored"
      />
      </div>
  )
}

export default App
