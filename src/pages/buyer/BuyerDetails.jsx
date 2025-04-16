import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import buyer_bg from "../../assets/buyer_bg.jpg";

const BuyerDetailsForm = () => {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    companyName: "",
    location: {
      district: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await AxiosPrivate.post("/buyer/submit/info", formData);
      toast.success(res.data.message || "Buyer details submitted successfully");

      setFormData({
        name: "",
        phone: "",
        address: "",
        companyName: "",
        location: { district: "", state: "", pincode: "" },
      });

      navigate("/dashboard");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url(${buyer_bg})`,
      }}
    >
      <div className=" rounded-xl shadow-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-700">
          Buyer Details Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1">Name (optional)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="p-2 border rounded-md"
              placeholder="Your company name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded-md"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                District<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.district"
                value={formData.location.district}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="District"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="State"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Pincode<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.pincode"
                value={formData.location.pincode}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Pincode"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerDetailsForm;
