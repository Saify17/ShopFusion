// src/pages/Home.jsx - Upgraded Professional Storefront UI
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";

import { 
  ArrowRight, 
  Flame 
} from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.productsStore);

  useEffect(() => {
    if (productsStore.products.length === 0) {
      dispatch(fetchProducts({ limit: 100, skip: 0 }));
    }
  }, []);

  const featured = productsStore.products
    .filter((p) => p.rating >= 4.3) // Only high rated
    .slice(0, 8); // Take 8

  const deals = productsStore.products
    .filter((p) => p.discountPercentage >= 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 8);

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION  */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 overflow-hidden shadow-2xl text-white py-10">
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-start justify-center space-y-6">
            <span className="bg-blue-500/30 border border-blue-300/30 text-blue-100 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" /> Mega Sale Live Now
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Discover Quality Products at <span className="text-white">Unbeatable Prices</span>
            </h1>
            
            <p className="text-base md:text-lg text-blue-100 font-light max-w-lg">
              Explore 1000+ items featuring instant search, dynamic filters, live cart sync, and secure authentication.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/products" 
                className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2 group"
              >
                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/products" 
                className="border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Explore Catalog
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Product Image */}
          <div className="flex items-center justify-center relative">
            {/* Circular glowing backlight behind the product */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-white/10 rounded-full blur-2xl"></div>

            <img 
              src="/images/luxury_bags_transparent_final.png" 
              alt="Featured Product" 
              className="relative z-10 w-full max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition duration-500 rounded-2xl"
            />
          </div>

        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-0 space-y-16">
        
        {/* Featured Products Section (8 high rated) */}
        <section>
          {featured.length > 0 && (
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <Link to="/products" className="text-blue-600 font-medium text-sm hover:underline">See All →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featured.map((oneProduct) => (
                  <ProductCard key={oneProduct.id} product={oneProduct} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Hot Deals Section */}
        <section>
          {deals.length > 0 && (
            <div className="max-w-7xl mx-auto md:px-4">
              <h2 className="text-3xl font-bold text-gray-900">Hot Deals</h2>
              <p className="text-gray-500 mt-1 text-sm">Highest discount first — Limited time</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {deals.map((oneProduct) => (
                  <ProductCard key={oneProduct.id} product={oneProduct} />
                ))}
              </div>
            </div>
          )}
        </section>
        
      </div>

    </div>
  );
};

export default Home;