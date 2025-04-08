import React from "react";
import { FaHeartbeat, FaUsers, FaHospital, FaHandHoldingMedical } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BloodLink</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting donors and recipients to save lives through efficient blood management
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            BloodLink is dedicated to revolutionizing the way blood donation and transfusion services are managed. 
            Our platform connects blood donors, hospitals, and blood banks to ensure that life-saving blood is 
            available when and where it's needed most.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Do</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Connect blood donors with hospitals and blood banks
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Manage blood inventory efficiently
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Provide real-time blood availability information
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Streamline the blood donation process
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Impact</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Reduced waiting time for blood transfusions
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Increased blood donation participation
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Improved blood inventory management
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Enhanced emergency response capabilities
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHeartbeat className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Blood Donation</h3>
            <p className="text-gray-600">Easy and efficient blood donation process</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaUsers className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">Connect with donors and recipients</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHospital className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hospitals</h3>
            <p className="text-gray-600">Seamless integration with healthcare providers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHandHoldingMedical className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600">24/7 assistance and guidance</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a donor, hospital, or blood bank, join us in making blood donation and transfusion services more efficient and accessible.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/register"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 