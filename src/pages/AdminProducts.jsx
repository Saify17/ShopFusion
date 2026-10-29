import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct, removeAdminProduct, updateAdminProduct  } from "../redux/slices/productsSlice";
import Swal from "sweetalert2";

const AdminProducts = () => {
  // Same useSelector pattern you already know from Navbar.jsx and Cart.jsx —
  // it just means "give me a live-updating copy of this slice of the store"
  const authStore = useSelector((state) => state.authStore);
  const productsStore = useSelector((state) => state.productsStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const isAdmin = authStore.user && (authStore.user.role === "admin" || !authStore.user.role);

  useEffect(() => {
    if (!authStore.user) navigate("/login"); // no one logged in -> bounce to login page
  }, [authStore.user, navigate]);


  const [form, setForm] = useState({ title: "", price: "", brand: "", category: "", thumbnail: "", description: "", stock: "", discountPercentage: "" });
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });



    const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        discountPercentage: Number(form.discountPercentage) || 0,
    };

    if (editingId) { // EDIT MODE
        const target = productsStore.products.find((p) => p.id === editingId); 
        if (target?.isAdminAdded) {
        dispatch(updateAdminProduct({ id: editingId, data: payload }));
        } else {
        dispatch(updateProduct({ id: editingId, data: payload }));
        }
        setEditingId(null);
    } else { 
        dispatch(addProduct({ ...payload, rating: 0, reviews: [], images: form.thumbnail ? [form.thumbnail] : [] }));
    }

    setForm({ title: "", price: "", brand: "", category: "", thumbnail: "", description: "", stock: "", discountPercentage: "" });
    };

    const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
        title: p.title || "",
        price: p.price || "",
        brand: p.brand || "",
        category: p.category || "",
        thumbnail: p.thumbnail || "",
        description: p.description || "",
        stock: p.stock || "",
        discountPercentage: p.discountPercentage || "",
    });
    };


  if (!authStore.user) return null; 
  if (!isAdmin) {
    return (
      <p className="text-center py-20 text-red-500 font-semibold">
        Admins only — your role: {authStore.user.role || "user"}
      </p>
    );
  }


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin — Manage Products</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-gray-100 mb-10">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border rounded-lg px-3 py-2 text-sm" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="border rounded-lg px-3 py-2 text-sm" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border rounded-lg px-3 py-2 text-sm" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border rounded-lg px-3 py-2 text-sm" />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="border rounded-lg px-3 py-2 text-sm sm:col-span-2" />
        <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg px-3 py-2 text-sm sm:col-span-2"
            rows={3}
            />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock (e.g. 20)" className="border rounded-lg px-3 py-2 text-sm" />
        <input name="discountPercentage" type="number" value={form.discountPercentage} onChange={handleChange} placeholder="Discount % (e.g. 10)" className="border rounded-lg px-3 py-2 text-sm" />


            <button type="submit" className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">
            {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
            <button
                type="button"
                onClick={() => {
                setEditingId(null);
                setForm({ title: "", price: "", brand: "", category: "", thumbnail: "", description: "", stock: "", discountPercentage: "" });
                }}
                className="sm:col-span-2 bg-gray-100 text-gray-600 font-medium py-2 rounded-lg"
            >
                Cancel Edit
            </button>
            )}


      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {productsStore.products.map((p) => (
          <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
            <img src={p.thumbnail} alt={p.title} className="h-32 w-full object-contain" />
            <p className="font-semibold text-sm">{p.title}</p>
            <p className="text-blue-700 font-bold">${p.price}</p>


                    <div className="flex gap-2 mt-auto">
                   
                    <button
                        onClick={() => startEdit(p)}
                        className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium py-1.5 rounded-lg"
                    >
                        Edit
                    </button>


                    <button
                    onClick={() => {
                        Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                        
                        if (result.isConfirmed) {
                            
                           
                            if (p.isAdminAdded) {
                            dispatch(removeAdminProduct(p.id));
                            } else {
                            dispatch(deleteProduct(p.id));
                            }

                            
                            Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success"
                            });
                        }
                        });
                    }}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium py-1.5 rounded-lg"
                    >
                    Delete
                    </button>


                    </div>


          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminProducts;