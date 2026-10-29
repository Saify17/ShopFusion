
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { CircleUser } from 'lucide-react';

const Navbar = () => {

  const authStore = useSelector((state) => state.authStore);
  console.log("authstore value is", authStore);

  const cartStore = useSelector((state) => state.cartStore);
  console.log("cartstore value is ", cartStore.totalItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Helper function for NavLink active tab styling (Keeping your clean blue/white theme)
  // GETTING FROM: React Router DOM isActive state -> GIVING TO: Tailwind CSS classes
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-all"
      : "text-gray-700 hover:text-blue-600 font-medium transition-all";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-[1.80rem] font-bold text-blue-700 tracking-tight hover:opacity-90 transition">
              ShopFusion
            </Link>
          </div>

          {/* Desktop Links - With Active Tab Highlighting */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/cart" className={navLinkClass}>Cart ({cartStore.totalItems})</NavLink>
            {authStore.user && (authStore.user.role === "admin" ) && (
              <NavLink to="/adminPanel" className={navLinkClass}>Admin</NavLink>
)}
 
            {authStore.user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-2xl border border-gray-100">
                  <CircleUser className='text-blue-700 w-5 h-5' /> Hi {authStore.user.username}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="cursor-pointer bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink to="/signup" className={navLinkClass}>Sign Up</NavLink>
                <NavLink 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          

          {/* Mobile Menu Button - simple for now */}
          <div className="md:hidden">
            <button className="text-gray-700 font-medium p-2">Menu</button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;