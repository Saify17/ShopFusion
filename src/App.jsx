// src/App.jsx - Version 1
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
   {/* Temporary body - we will replace with Pages later */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-gray-900">Welcome to ShopFusion</h2>
        <p className="text-gray-600 mt-3 text-lg">Your wonderful UI is starting... Next we add Router and Products.</p>
      </div>
    </div>
  );
}

export default App;