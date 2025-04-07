import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <BiDonateBlood className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-2xl font-bold">BloodLink</span>
          </div>

          {/* User Info and Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <BiUserCircle className="h-6 w-6 mr-2" />
              <span className="mr-2">
                {user?.name || user?.hospitalName || user?.organisationName}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-700 rounded-full">
                {user?.role}
              </span>
            </div>

            {/* Navigation Links */}
            {(location.pathname === "/" || 
              location.pathname === "/donar" || 
              location.pathname === "/hospital") ? (
              <Link to="/analytics" className="text-white hover:text-red-400">
                Analytics
              </Link>
            ) : (
              <Link to="/dashboard" className="text-white hover:text-red-400">
                Home
              </Link>
            )}

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
