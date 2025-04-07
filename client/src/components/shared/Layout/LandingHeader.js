import React from "react";
import { Link } from "react-router-dom";
import { BiDonateBlood } from "react-icons/bi";
import bloodlinkLogo from "../../../../public/assets/images/BloodLink Logo.png"

const LandingHeader = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            {/* <BiDonateBlood className="h-8 w-8 text-red-600" /> */}
            <image src={bloodlinkLogo} alt="BloodLink Logo" className="h-8 w-8"/>
            <span className="ml-2 text-2xl font-bold text-gray-800">BloodLink</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-red-600">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-red-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-red-600">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-md hover:border-red-600"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader; 