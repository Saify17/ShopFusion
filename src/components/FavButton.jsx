import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // you already have lucide-react!
import { toggleFavorite } from "../redux/slices/favSlice";

const FavButton = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(store => store.authStore);
  const fav = useSelector(store => store.favStore);
  const isFav = fav.fav.some(state => state.id === product.id);

  const handle = (e) => {
    e.stopPropagation(); 
    if (!auth.user) { navigate("/login"); return; }
    dispatch(toggleFavorite(product)); 
  };

  return (
    <button onClick={handle} 
      className={`p-2 rounded-full border ${isFav ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-gray-400"}`}>
      <Heart size={18} className={isFav ? "fill-red-500" : ""} />
    </button>
  );
};
export default FavButton;