

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi, removeFromCart } from "../redux/slices/cartSlice";
import Swal from 'sweetalert2'


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
   const dispatch = useDispatch()

   const authStore = useSelector((state) => state.authStore);
   const cartStore = useSelector((state) => state.cartStore);
   const currentUserId = authStore.user?.id;

   const isInCart = cartStore.cart.some(item => item.id === product.id);

    const handleAddToCart = async () => {
      if (!authStore.user) {
        navigate("/login");
      return;
      }

      if (isInCart) {
        dispatch(removeFromCart({ id: product.id }));
        Swal.fire({
          title: "Cart Removed!",
          icon: "success",
          draggable: true
        });
      return;
    }

      try {
        
       const result = await dispatch(
      addToCartApi({ product, userId: currentUserId })
        ).unwrap();
        
        Swal.fire({
          title: "Added to Cart!",
          icon: "success",
          draggable: true
        });



        } catch (err) {
      alert("Add to cart failed: " + err);
      }
  };


  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group">
      {/* Image with discount badge */}
      <div onClick={()=>{navigate(`/products/${product.id}`)}}  className="relative bg-gray-50 hover:cursor-pointer">
        <img src={product.thumbnail} alt={product.title} className="w-full h-56 object-contain p-4 group-hover:scale-105 transition duration-300" />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {product.discountPercentage}% OFF
        </span>
        <span className={`absolute top-3 right-3 text- px-2 py-1 rounded-full font-medium ${product.stock > 10? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {product.stock > 0? `${product.stock} left` : 'Out of stock'}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text- text-gray-500 uppercase tracking-wider">{product.brand}</p>
          <p className="text- text-gray-500">{product.category}</p>
        </div>
        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{product.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-8">{product.description}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">${product.price}</p>
            <p className="text-xs text-gray-400 line-through">${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">⭐ {product.rating}</p>
            <p className="text- text-gray-500">{product.reviews?.length} reviews</p>
          </div>
        </div>

        {/* <div className="mt-3  rounded-lg p-2 text- text-gray-600 space-y-1 flex gap-1.5 text-xs">
          <p className="px-3 py-1 bg-gray-100 rounded-2xl"> {product.warrantyInformation}</p>
          <p className="px-3 py-1 bg-gray-100 rounded-2xl"> {product.shippingInformation}</p>
        </div> */}

      <button onClick={handleAddToCart}  className={`w-full mt-4 py-2.5 cursor-pointer active:scale-95 rounded-xl font-medium transition 
        ${isInCart ? "bg-red-500 hover:bg-red-600 text-white" : 
        "bg-gray-900 hover:bg-blue-600 text-white"}`}>
      {isInCart ? "✕ Remove from Cart" : "Add to Cart"} 
      </button>
      </div>
    </div>
  );
};

export default ProductCard;