import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi, removeFromCart } from "../redux/slices/cartSlice";
import Swal from 'sweetalert2'
import FavButton from '../components/FavButton'

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const authStore = useSelector((state) => state.authStore);
  const cartStore = useSelector((state) => state.cartStore);
  const currentUserId = authStore.user?.id;
  const isInCart = cartStore.cart.some(item => item.id === product.id);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!authStore.user) {
      navigate("/login");
      return;
    }
    if (isInCart) {
      dispatch(removeFromCart({ id: product.id }));
      Swal.fire({ title: "Cart Removed!", icon: "success" });
      return;
    }
    try {
      await dispatch(addToCartApi({ product, userId: currentUserId })).unwrap();
      Swal.fire({ title: "Added to Cart!", icon: "success" });
    } catch (err) {
      alert("Add to cart failed: " + err);
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group">
      {/* Image with badges */}
      <div className="relative bg-gray-50 hover:cursor-pointer group/image">
        <img 
          onClick={handleCardClick}
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-56 object-contain p-4 group-hover:scale-105 transition duration-300" 
        />
        
        {/* Top Left - Discount */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow z-10">
          {product.discountPercentage}% OFF
        </span>
        
        {/* Top Right - Stock */}
        <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium z-10 ${product.stock > 10? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {product.stock > 0? `${product.stock} left` : 'Out of stock'}
        </span>

        {/* Bottom Right - Fav Button - Well fitted, not overlapping */}
        <div className="absolute bottom-3 right-3 z-20">
          <FavButton product={product} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-xs text-gray-500 uppercase tracking-wider truncate">{product.brand}</p>
          <p className="text-xs text-gray-500 truncate ml-2">{product.category}</p>
        </div>
        <h3 onClick={handleCardClick} className="font-semibold text-gray-900 mt-1 line-clamp-1 hover:text-blue-600 cursor-pointer">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-8">{product.description}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">${product.price}</p>
            <p className="text-xs text-gray-400 line-through">${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">⭐ {product.rating}</p>
            <p className="text-xs text-gray-500">{product.reviews?.length} reviews</p>
          </div>
        </div>

        <button onClick={handleAddToCart} className={`w-full mt-4 py-2.5 cursor-pointer active:scale-95 rounded-xl font-medium transition ${isInCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-900 hover:bg-blue-600 text-white"}`}>
          {isInCart ? "✕ Remove from Cart" : "Add to Cart"} 
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
