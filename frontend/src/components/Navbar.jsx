import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../store/auth/authSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md sticky w-full z-50 top-0 h-[10vh]">
      <div className="max-w-7xl mx-auto w-full h-full md:px-8 sm:px-6 px-3 py-4 flex justify-between items-center">
        <div
          className="text-2xl cursor-pointer font-bold text-green-600 hover:text-green-700"
          onClick={() => scrollToSection("#home")}
        >
          Library
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-[16px] font-medium text-gray-700 h-full items-center">
          <NavLink to="/" className="hover:text-green-600 cursor-pointer">
            Home
          </NavLink>
          <NavLink to="/my-bools" className="hover:text-green-600 cursor-pointer">
            My-Books
          </NavLink>
          <NavLink to="/create-book" className="hover:text-green-600 cursor-pointer">
            Create-Book
          </NavLink>
        </div>

        {/* Login/Logout buttons */}
        {isLoggedIn ? (
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
            >
              Login / Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <FiMenu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col font-semibold text-lg text-center bg-white shadow-md w-full mx-auto px-3 py-4 space-y-4 ">
          <NavLink to="/" className="hover:text-green-600 cursor-pointer ">
            Home
          </NavLink>
          <NavLink to="/my-books" className="hover:text-green-600 cursor-pointer">
            My-Books
          </NavLink>
          <NavLink to="/create-book" className="hover:text-green-600 cursor-pointer">
            Create-Book
          </NavLink>
          <div className="pt-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
