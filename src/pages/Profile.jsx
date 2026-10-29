import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice";
import Swal from "sweetalert2";

const Profile = () => {
  const authStore = useSelector((state) => state.authStore);
  const dispatch = useDispatch();


  const [form, setForm] = useState({
    username: authStore.user?.username || "",
    email: authStore.user?.email || "",
    firstName: authStore.user?.firstName || "",
    lastName: authStore.user?.lastName || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id: authStore.user.id, data: form }))
      .unwrap()
      .then(() => Swal.fire({ title: "Profile Updated!", icon: "success" }))
      .catch(() => Swal.fire({ title: "Update failed", icon: "error" }));
  };

  if (!authStore.user) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default Profile;