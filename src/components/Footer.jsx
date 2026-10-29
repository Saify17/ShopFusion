import { Link, useNavigate } from "react-router-dom";
import {Phone,Mail} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  // Helper to go to products with category - FIXED: now Products.jsx reads ?category=
  const goCategory = (cat) => {
    navigate(`/products?category=${cat}`);
  };

  return (
    <footer className="mt-12 pt-10 pb-4 bg-[#0b0b14] border-t  text-[#9aa0b8]">


      {/* Main - COMPACT 3 columns */}
      <div className="max-w-7xl mx-auto px-4  grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand - Customer facing text, NOT dummy API text */}
        <div>
          <Link to="/" className="text-[1.6rem] font-bold tracking-tight">
            <span className="text-white">Shop</span>
            <span className="text-[#00f5ff]">Fusion</span>
          </Link>
          <p className="mt-2 text-[13px] leading-5">
            Discover quality products at unbeatable prices. Fast delivery,
            secure checkout, and customer-first support.
          </p>
          <div className="mt-4 space-y-1.5 text-[12px]">
            <p className="flex items-center gap-2">
              <Phone size={13} className="text-[#39ff14]" /> +92 304 7437115
            </p>
            <p className="flex items-center gap-2">
              <Mail size={13} className="text-[#00f5ff]" /> @shopefusion.com
            </p>
          </div>
        </div>

        {/* Shop by Category - ONLY 4, clickable and WORKING now */}
        <div>
          <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-3">
            Shop
          </h3>
          <ul className="space-y-2 text-[13px]">
            <li>
              <button
                onClick={() => goCategory("beauty")}
                className="hover:text-[#00f5ff] transition text-left"
              >
                Beauty & Fragrances
              </button>
            </li>
            <li>
              <button
                onClick={() => goCategory("furniture")}
                className="hover:text-[#00f5ff] transition text-left"
              >
                Furniture & Decor
              </button>
            </li>
            <li>
              <button
                onClick={() => goCategory("groceries")}
                className="hover:text-[#00f5ff] transition text-left"
              >
                Groceries
              </button>
            </li>
            <li>
              <button
                onClick={() => goCategory("laptops")}
                className="hover:text-[#00f5ff] transition text-left"
              >
                Laptop / Electronics
              </button>

              
            </li>
          </ul>
        </div>

        {/* Support - ONLY 4 links */}
        <div>
          <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-[13px]">
            <li>
              <Link to="/cart" className="hover:text-white transition">
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <p onClick={()=>{navigate("/ShippingPolicy")}} className="hover:text-white transition cursor-pointer">
                Shipping Policy
              </p>
            </li>
            <li>
              <p onClick={()=>{navigate("/contactHelp")}} className="hover:text-white transition cursor-pointer">
                Contact & Help
              </p>
            </li>
          </ul>

 
        </div>
         </div>

           <p className="text-xs text-center flex items-center justify-center gap-1 pt-8">
            © 2026 ShopFusion All rights reserved.
          </p>

      {/* Bottom - COMPACT */}

    </footer>
  );
};

export default Footer;
