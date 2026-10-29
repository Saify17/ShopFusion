// src/App.jsx - Version 1
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import ShippingPolicy from "./components/ShippingPolicy";
import ContactHelp from "./components/ContactHelp";
import AdminProducts from "./pages/AdminProducts";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/shippingPolicy" element = {<ShippingPolicy/>}/>
      <Route path="/contactHelp" element={<ContactHelp/> }/>
      <Route path="/AdminPanel" element={<AdminProducts/>}/>
      <Route path="/favorites" element={<Favorites/> } />
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/profile" element={<Profile/>}/>
      
      
    </Routes>

    <Footer/>
    </div>
  );
}

export default App;