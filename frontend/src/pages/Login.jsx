import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-300"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-6">
          <FaLock className="inline mr-2  text-green-600 text-2xl" />
          Login to Your Account
        </h1>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between items-center mt-6 text-sm md:text-lg text-gray-700">
          <h3 className="inline">Don't have an account?</h3>
          <NavLink
            to="/register"
            className="ml-2 text-green-600 hover:text-green-700 underline flex items-center"
          >
            Register Now
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
