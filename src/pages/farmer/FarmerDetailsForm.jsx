import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import farmer_bg from '../../assets/farmer_bg.jpg';

const FarmerDetailsForm = () => {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    location: {
      district: "",
      state: "",
      pincode: ""
    },
    landSize: "",
    cropsGrown: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      cropsGrown: formData.cropsGrown.split(",").map((crop) => crop.trim())
    };

    try {
      const res = await AxiosPrivate.post("/farmer/submit/info", payload);
      toast.success("Farmer details submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        address: "",
        location: { district: "", state: "", pincode: "" },
        landSize: "",
        cropsGrown: ""
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${farmer_bg})` }}
    >
      <div className="max-w-3xl w-full bg-gray-400/20 p-6 rounded-xl shadow-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Farmer Details Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                District<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.district"
                value={formData.location.district}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Pincode<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location.pincode"
                value={formData.location.pincode}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Land Size (e.g. 5 acres)
            </label>
            <input
              type="text"
              name="landSize"
              value={formData.landSize}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Crops Grown (comma-separated)
            </label>
            <textarea
              name="cropsGrown"
              value={formData.cropsGrown}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
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

export default FarmerDetailsForm;
