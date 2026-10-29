import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  const fav = useSelector(s => s.favStore);
  const auth = useSelector(s => s.authStore);

  // 1. Not Logged In
  if (!auth.user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <Heart size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Please login to view your favorites</h2>
        <p className="text-gray-500 mt-1 mb-6">Log in to see all your saved items.</p>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition">
          Go to Login
        </Link>
      </div>
    );
  }

  // 2. Empty Favorites
  if (fav.fav.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <Heart size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">No favorites yet</h2>
        <p className="text-gray-500 mt-1 mb-6">Explore products and tap the heart icon to save them here.</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition">
          Browse Products
        </Link>
      </div>
    );
  }

  // 3. Favorites List
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">My Favorites ({fav.fav.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fav.fav.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Favorites;