import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { MdHowToReg } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/register`,
        formData
      );
      console.log(response)
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400">
      <form
        onSubmit={handleRegistration}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-300"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-6">
          <MdHowToReg className="inline mr-2 text-green-600" />
          Create an Account
        </h1>

        <div className="mb-6">
          <label
            htmlFor="username"
            className="block font-semibold mb-2 text-sm md:text-base"
          >
            <FaUserAlt className="inline mr-2 mb-1" />
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-200 border focus:border-green-500 focus:ring-green-500 focus:ring-2 transition duration-200"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block font-semibold mb-2 text-sm md:text-base"
          >
            <FaEnvelope className="inline mr-2 mb-1" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-200 border focus:border-green-500 focus:ring-green-500 focus:ring-2 transition duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block font-semibold mb-2 text-sm md:text-base"
          >
            <FaLock className="inline mr-2 mb-1" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="w-full p-3 pr-10 rounded-md bg-gray-200 border focus:border-green-500 focus:ring-green-500 focus:ring-2 transition duration-200"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 text-white p-3 rounded-md mt-8 text-lg font-bold transition duration-200 flex items-center justify-center ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {loading ? (
            <ImSpinner2 className="animate-spin mr-2" />
          ) : (
            <BsArrowRightCircle className="mr-2" />
          )}
          {loading ? "Registering..." : "Register Now"}
        </button>

        <div className="flex justify-between items-center mt-6 text-sm md:text-lg text-gray-700">
          <h3 className="inline">Already have an account?</h3>
          <NavLink
            to="/login"
            className="ml-2 text-green-600 hover:text-green-700 underline flex items-center"
          >
            <FiLogIn className="mr-1" />
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
