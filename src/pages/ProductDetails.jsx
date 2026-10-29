import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchingSingleProduct } from "../redux/slices/productsSlice";
import {addToCartApi, removeFromCart} from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const productStore = useSelector((state) => state.productsStore);
  const authStore =useSelector((store)=>store.authStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = authStore.user?.id;
  const [selectedImage, setSelectedImage] = useState(0);

  const cartStore = useSelector((state) => state.cartStore);


   const handleAddToCart = () => {
      if (!authStore.user) { 
        navigate("/login"); return; 
      }
        isInCart ? dispatch(removeFromCart({ id: product.id })) : dispatch(addToCartApi({ product, userId: currentUserId })); 
   }


  useEffect(() => {
    dispatch(fetchingSingleProduct(id));
    
  }, [id, dispatch]); 

  // Now: If loading true OR singleProduct null → Show Loading... (not No product)
  if (productStore.loading || !productStore.singleProduct) {
    return <p className="text-center py-10 h-[65vh] flex items-center justify-center text-4xl font-bold">Loading...</p>;
  }

  const product = productStore.singleProduct;
  const isInCart = cartStore.cart.some(item => item.id === product.id);



  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">

      <div className="text-sm text-gray-500 mb-6">
        Home / Products / <span className="text-gray-900 font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Images Gallery  */}

        <div>
          <div className="bg-gray-50 rounded-2xl p-6 h-[450px] flex items-center justify-center relative overflow-hidden">
            
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              
              alt={product.title}
              className="w-full h-full object-contain hover:scale-105 transition duration-300"
            />
            {/* Discount Badge - Getting FROM product.discountPercentage */}
            <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow">
              {product.discountPercentage}% OFF
            </span>
            {/* Stock Badge */}
            <span className={`absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {product.availabilityStatus || (product.stock > 0 ? `${product.stock} left` : 'Out of stock')}
            </span>
          </div>

          {/* Small Thumbnails - STEP 2 - Add images gallery */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)} // Giving idx TO selectedImage state
                className={`w-20 h-20 bg-gray-50 rounded-xl p-2 cursor-pointer border-2 ${selectedImage === idx ? 'border-blue-600' : 'border-gray-200'} hover:border-blue-400 transition`}
              >
                <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Info - Building IN STEPS */}
        <div>
          <div className="flex gap-3 text-xs">
            <span className="bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider text-gray-600">{product.brand}</span>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{product.category}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.title}</h1>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviews?.length} reviews)</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          {/*  price */}
          <div className="mt-6 flex items-end gap-4">
            <p className="text-4xl font-bold text-gray-900">${product.price}</p>
            <p className="text-lg text-gray-400 line-through">${originalPrice}</p>
          </div>

          {/* Description  */}
          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          {/* Warranty + Shipping + Dimensions - STEP 3 Add more */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Warranty</p>
              <p className="font-medium text-sm mt-1">{product.warrantyInformation}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Shipping</p>
              <p className="font-medium text-sm mt-1">{product.shippingInformation}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Weight & Dimensions</p>
              <p className="font-medium text-sm mt-1">{product.weight}kg, {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Return Policy</p>
              <p className="font-medium text-sm mt-1">{product.returnPolicy || '30 days return'}</p>
            </div>
          </div>

          {/* Cart - STEP 4 */}
          <div className="mt-8 flex gap-4">


          <button onClick={handleAddToCart} className={`flex-1 py-4 rounded-xl font-semibold text-lg 
            ${isInCart ? "bg-red-500 hover:bg-red-600" : "bg-gray-900 hover:bg-blue-600"} text-white`}>
            {isInCart ? `Remove from Cart - ${product.price}` : `Add to Cart - ${product.price}`} 
          </button>

            <button className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition text-xl">♡</button>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section - STEP 5 Add reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Customer Reviews ({product.reviews?.length}) - ⭐ {product.rating}</h2>
        <div className="mt-6 grid gap-4">
          {product.reviews?.map((review, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-xs text-gray-500">{review.reviewerEmail}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium text-sm">{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-3">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;