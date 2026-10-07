// src/pages/Home.jsx - Version 1 Basic - Wonderful UI Hero
// Chain Future: This page will later get featured products from productsSlice -> Home
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section - Wonderful UI */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 md:p-16 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome to ShopFusion
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl">
          Discover 1000+ products with 20 per page pagination, search, filters, cart and wishlist - All via real APIs.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/products" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow">
            Shop Now
          </Link>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800">Featured Categories - Coming from API next step</h2>
      </div>
    </div>
  );
};

export default Home;