
import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { signUp } from "../redux/slices/authSlice"; 
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const authStore = useSelector((state)=> state.authStore);
    const navigate = useNavigate();


      const validate = () => { 
    const newErrors = {};

    if (!username.trim()) { 
      newErrors.username = "username is required"; 
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) { 
      newErrors.email = "Email must include @";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0;
  };


    const handleSignUp = (e) => { 
        e.preventDefault(); 
        if (!validate()) { 
          return;
        }
        console.log({username,email,password});
        dispatch(signUp({username, email, password}))
        .then((result)=>{ 
            if(signUp.fulfilled.match(result)) 
                navigate("/login"); 
            }); 
        };
        
    
  return (
    <div className="min-h-[calc(100vh-64px)]  bg-gray-50 flex items-center justify-center">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md  ">
    <h1 className="text-3xl font-bold text-center text-blue-600 pb-2">Join ShopFusion</h1> 
     <p className="text-gray-500 text-center mb-4">Create account to shop online</p>

     <form onSubmit={handleSignUp} className="mt-6 space-y-4">
    <div>
    <label className="text-md font-medium">username</label>
    <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter your username" className={`w-full border rounded-xl px-4 py-3 mt-1 ${errors.username ? "border-red-500" : "border-gray-300"}`}/>
    {errors.username && (
        <p className="text-red-500 text-sm mt-1">{errors.username}</p> 
     )}
    </div>
    <div>
    <label className="text-md font-medium mt-4 block">Email</label> 
    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email" className={`w-full border rounded-xl px-4 py-3 mt-1 ${errors.username ? "border-red-500" : "border-gray-300"}`} /> 
    {errors.email &&  (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p> 
     )}
    </div>
    <div>
    <label className="text-md font-medium mt-4 block">Password</label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className={`w-full border rounded-xl px-4 py-3 mt-1 ${errors.password ? "border-red-500" : "border-gray-300"}`}/>    
        {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p> 
     )}
    </div>

    {authStore.error && <p className="text-red-500 text-sm">{authStore.error}</p>} 
    {authStore.loading && <p className="text-blue-500 text-sm">Creating account...</p>} 

    <button type="submit" disabled={authStore.loading} className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 font-semibold">{authStore.loading ? "Signing Up..." : "Sign Up"}</button> 
    
    </form>

    <p className="text-center mt-4 text-sm">Already have account? <Link to="/login" className="text-blue-600">Login</Link></p> 
  </div>
</div>
  );
};

export default Signup