import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { toast } from "react-toastify";
import { AxiosPublic } from "../api/axiosInstance.js";
const CheckAuthProvider = ({ children }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(true); // 👈 Add this
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await AxiosPublic.post("/user/refresh-token",{},{withCredentials:true})
        const { user, accessToken, refreshToken } = res.data.data;
        if (user && accessToken) {
          // console.log("User data: ",user);
          login({ user, accessToken, refreshToken });
        }
      } catch (err) {
        toast.info("You are not logged in")
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };
    checkLoggedIn();
  }, []);

  if (loading) return <div
  className="text-center text-pink-600 bg-blue-400 p-4"
  >Loading...</div>; // 👈 Show loader until auth check finishes

  return children;
};

export default CheckAuthProvider;
