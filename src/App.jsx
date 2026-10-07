// src/App.jsx - Version 1
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
    </Routes>
    </div>
  );
}

export default App;