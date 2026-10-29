// src/pages/Products.jsx - FIXED to support ?category= from Footer
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, Link, useNavigate } from "react-router-dom"; 
import { fetchProducts, searchProducts, fetchProductsByCategory, fetchCategoryList } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams(); 
  const category = searchParams.get("category"); 

  // const for filters
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const productsStore = useSelector((state) => state.productsStore);
  const dispatch = useDispatch();

  useEffect(() => {

    if (category) {
      console.log("Fetching category:", category); // e.g., beauty -> 5 products
      dispatch(fetchProductsByCategory(category)); 
    } else if (searchTerm === "") {
      const skip = (currentPage - 1) * productsStore.limit;
      dispatch(fetchProducts({ limit: 12, skip: skip, sortBy, order }));
    } else {
      dispatch(searchProducts(searchTerm));
    }
  }, [currentPage, searchTerm, category, dispatch, sortBy, order]); 


    useEffect(() => {
      dispatch(fetchCategoryList());
    }, [dispatch]);

    const filteredProducts = productsStore.products.filter((p) => {
    const minOk = minPrice === "" || p.price >= Number(minPrice); // empty box = no lower limit
    const maxOk = maxPrice === "" || p.price <= Number(maxPrice); // empty box = no upper limit
    return minOk && maxOk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-7xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : "Products Catalog"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {category
                ? `Showing ${productsStore.products.length} products in ${category}`
                : "Explore our collection of premium items"}
            </p>
            {category && (
              <Link
                to="/products"
                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
              >
                ← Clear filter, show all
              </Link>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto md:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Here ..."
              className="flex-1 md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button className="bg-blue-700 hover:bg-blue-800 cursor-pointer text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-sm whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>
      
      
      <div className="mt-8 flex flex-col md:flex-row gap-6 items-start">
          
          <aside className="w-full md:w-64 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-5 h-fit space-y-6">


            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Sort By</label>
              <select
                value={sortBy ? `${sortBy}-${order}` : ""}
                onChange={(e) => {
                  const [field, ord] = e.target.value.split("-"); // "price-asc" -> ["price","asc"]
                  setSortBy(field || "");
                  setOrder(ord || "asc");
                }}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>

            {/* Price Range — client-side, no API call */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Price Range</label>
              <div className="flex items-center gap-2 mt-2">
                <input type="number" min="0" placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-lg px-2 py-2 text-sm" />
                <span className="text-gray-400">-</span>
                <input type="number" min="0" placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-lg px-2 py-2 text-sm" />
              </div>
            </div>


            {/* Category */}

            <div className="hidden md:block">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 ">
                Categories
              </label>
              
              <ul className="space-y-1">
                {/* "All" Category Option */}
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      !category
                        ? "bg-blue-50/80 text-blue-700 border-blue-200/80 font-semibold"
                        : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100/70 hover:text-gray-900"
                    }`}
                  >
                    <span>All Categories</span>
                    {!category && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                </li>

                {/* Dynamic Categories */}
                {productsStore.categories.map((cat) => {
                  const isActive = category === cat;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => navigate(`/products?category=${cat}`)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors border ${
                          isActive
                            ? "bg-blue-50/80 text-blue-700 border-blue-200/80 font-semibold"
                            : "bg-transparent text-gray-600 border-transparent hover:bg-gray-100/70 hover:text-gray-900"
                        }`}
                      >
                        <span>{cat.replace(/-/g, " ")}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>



            {/* category for mobile view  */}
            <div className="md:hidden">
              <label className="text-sm font-semibold text-gray-700 ">Category</label>
              <select
                value={category || ""}
                onChange={(e) => navigate(e.target.value ? `/products?category=${e.target.value}` : "/products")}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Categories</option>
                {productsStore.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>






          </aside>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 items-start">
            {filteredProducts.map((oneProduct) => (
              <ProductCard key={oneProduct.id} product={oneProduct} />
            ))}
          </div>
      </div>
      {productsStore.loading && (
        <p className="text-center py-10 h-[30vh] flex items-center justify-center text-2xl font-bold">
          Loading {category ? category : ""}...
        </p>
      )}
      {productsStore.error && (
        <p className="text-center text-red-500">{productsStore.error}</p>
      )}

      {/* Hide pagination when category filter active - because category returns all */}
      {!category && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : 1))}
            className="px-4 py-2 border rounded-lg"
          >
            Prev
          </button>
          <span className="px-4 py-2">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Products;
