// src/pages/Products.jsx - Version 1 Basic
// Chain Future: This page will dispatch fetchProducts() from productsSlice -> API /products?limit=20&skip=0 -> show 20 products
import React from "react";

const Products = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
      
      {/* Placeholder grid - wonderful UI skeleton */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1,2,3,4,5,6,7,8].map((n) => (
          <div key={n} className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;