
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">ShopFusion</h1>
          </div>

          {/* Desktop Links - Wonderful hover effect */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition">Cart (0)</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow">Sign Up</Link>
          </div>

          {/* Mobile Menu Button - simple for now */}
          <div className="md:hidden">
            <button className="text-gray-700 font-medium">Menu</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;