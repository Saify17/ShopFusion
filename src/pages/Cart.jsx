import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartByUser, removeFromCart, updateQuantity, clearCartLocal } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { Lock, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Star, HandleBottomRight } from 'lucide-react';
import Swal from "sweetalert2";


const Cart = () => {
  const authStore = useSelector((state) => state.authStore);
  const cartStore = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();
  const currentUserId = authStore.user?.id;

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchCartByUser(currentUserId));
    }
  }, [currentUserId, dispatch]);

  // If not logged in → show message
  if (!authStore.user) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full text-blue-600 shadow-sm border border-indigo-100">
          <ShoppingCart size={72} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">Please login to see your cart</h2>
        <p className="text-gray-500 max-w-md">Access your saved items and enjoy a seamless checkout experience.</p>
        <Link to="/login" className="mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5">
          Go to Login
        </Link>
      </div>
    );
  }

  // Loading state
  if (cartStore.loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[65vh] gap-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-indigo-600">Loading your cart...</p>
      </div>
    );
  }

  // Empty cart state
  if (cartStore.cart.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full text-indigo-600 border border-indigo-100">
          <ShoppingCart size={72} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 max-w-md">Looks like you haven't added anything to your cart yet. Explore our catalog to find great deals!</p>
        <Link to="/products"
          className="mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5">
          Browse Products
        </Link>
      </div>
    );
  }

  // Calculations
  const subtotal = cartStore.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50

  // Tiered Platform Fee based on total items count
  const totalItemsCount = cartStore.totalItems;
  let platformFee = 0.50;
  if (totalItemsCount >= 11) {
    platformFee = 1.50;
  } else if (totalItemsCount >= 10) {
    platformFee = 1.00;
  } else if (totalItemsCount >= 6) {
    platformFee = 0.75;
  }

  // Tax calculation (8% standard tax rate on subtotal)
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + platformFee + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">

      {/* Header with Hero-themed styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Shopping Cart 
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full shadow-sm">
              {cartStore.totalItems} {cartStore.totalItems === 1 ? 'item' : 'items'}
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Review your selected items and complete your order</p>
        </div>
        <Link to="/products" className="text-indigo-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1.5 transition">
          ← Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* LEFT: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartStore.cart.map((item) => (
            <div key={item.id}
              className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">

              {/* Product Image Container */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-32 h-32 flex-shrink-0 flex items-center justify-center p-3 relative group">
                <img
                  src={item.thumbnail || item.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details & Information */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug hover:text-indigo-600 transition">
                      {item.title}
                    </h3>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition flex items-center gap-1 text-xs font-medium flex-shrink-0"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Rating & Category Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    {item.rating && (
                      <span className="text-xs text-amber-700 bg-amber-50 font-semibold px-2.5 py-1 rounded-full border border-amber-200/60 flex items-center gap-1.5">
                        <Star size={13} className="fill-amber-500 text-amber-500" /> {item.rating} / 5.0
                      </span>
                    )}
                    {item.brand && (
                      <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2.5 py-0.5 rounded-full">
                        {item.brand}
                      </span>
                    )}
                    {item.category && (
                      <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2.5 py-0.5 rounded-full border border-indigo-100/60 capitalize">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Quantity Controls + Price Alignments */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  
                  {/* Plus / Minus Quantity Buttons (Using delta -1 and delta +1 from old working cart) */}
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 shadow-inner">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))} 
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 shadow-sm transition active:scale-95"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-sm font-extrabold text-gray-800 w-6 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))} 
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 shadow-sm transition active:scale-95"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Calculated Price */}
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900 tracking-tight">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">${item.price} each</p>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Detailed Order Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm sticky top-24 space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              <p className="text-xs text-gray-400 mt-0.5">Calculated based on current items</p>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartStore.totalItems} items)</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600 items-center">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded" : "font-bold text-gray-900"}>
                  {shipping === 0 ? "FREE" : "$" + shipping.toFixed(2)}
                </span>
              </div>

              {shipping > 0 && (
                <div className="text-xs text-indigo-700 bg-indigo-50/80 border border-indigo-100 p-2.5 rounded-xl flex items-center gap-1.5">
                  <Tag size={14} className="text-indigo-500 flex-shrink-0" />
                  <span>Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for FREE Shipping!</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 items-center">
                <span className="flex items-center gap-1.5">
                  Platform Fee
                </span>
                <span className="font-bold text-gray-900">${platformFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (5%)</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                <div>
                  <span className="text-gray-900 font-extrabold text-lg block">Total</span>
                  <span className="text-xs text-gray-400">Includes taxes & fees</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

       
            <button onClick={()=>{
              Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Place it!"
            }).then((result) => {
              if (result.isConfirmed){
                dispatch(clearCartLocal())
                Swal.fire({
                title: "Order Placed!",
                text: "Your order has been placed.",
                icon: "success"
              });
              } 
            });
            }
            } className="w-full bg-gradient-to-r cursor-pointer from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Place the order <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 pt-1">
              <ShieldCheck size={16} className="text-indigo-500" />
              <span>Secure Checkout Payment</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;