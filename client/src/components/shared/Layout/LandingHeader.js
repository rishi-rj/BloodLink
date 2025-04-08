import React from "react";
import { Link } from "react-router-dom";
import bloodlinkLogo from "../../../assets/images/BloodLink Logo.png";
import Iridescence from "../../animations/Iridescence";
import PixelCard from '../../animations/PixelCard';

const LandingHeader = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <img src={bloodlinkLogo} alt="BloodLink Logo" className="h-14 w-14"/>
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
            <div className="relative h-9 w-fit">
              <Iridescence
                color={[0, 1, 1]}
                mouseReact={true}
                amplitude={0.1}
                speed={5.0}
                className="absolute inset-0 rounded-md overflow-hidden"
              />  
              <Link 
                to="/login" 
                className="relative hover:scale-105 px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-md hover:border-red-600 bg-white/80"
              >
                Login
              </Link>
            </div>
            <div className="relative h-9 w-32">
              <PixelCard variant="yellow" className="rounded-lg hover:scale-105">
                <Link 
                  to="/register" 
                  className="absolute inset-0 flex items-center justify-center text-black font-medium hover:text-white"
                >
                  Sign Up
                </Link>
              </PixelCard>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader; 