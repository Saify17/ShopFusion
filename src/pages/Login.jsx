import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStore = useSelector((state) => state.authStore);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log({ username, password });
    dispatch(login({ username, password }))
      .then((result) => {
        if (login.fulfilled.match(result))
          navigate("/");
      })
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">Welcome Back</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
              type="text"
              placeholder="Enter your Username"
              className={`w-full border rounded-xl px-4 py-3 mt-1 ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              placeholder="Enter your password"
              className={`w-full border rounded-xl px-4 py-3 mt-1 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {authStore.error && <p className="text-red-500 text-sm">{authStore.error}</p>}
          {authStore.loading && <p className="text-blue-500 text-sm">Logging in...</p>}

          <button type="submit" disabled={authStore.loading} className='cursor-pointer w-full bg-blue-600 text-white py-3 rounded-xl mt-6 font-semibold'>Login</button>
        </form>

        <p className="text-center mt-4 text-sm">Don't have account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>

      </div>
    </div>
  )
}

export default Login