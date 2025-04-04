import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    // State to store form data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberme: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value, // ✅ Handles checkboxes correctly, other inputs stay the same
        });
    };
    
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent page reload
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("User Login Successful");
                navigate('/dashboard'); // ✅ Redirect after login
            } else {
                toast.error("User/password is incorrect");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Backend Down");
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-pink-400 to-cyan-400">
            <div className="w-[600px] h-[500px] flex bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                {/* Left Section */}
                <div className="w-[160px] flex flex-col items-center justify-center p-4 text-2xl font-bold text-gray-800 bg-gray-100">
                    LOGIN
                </div>

                {/* Separator */}
                <div className="w-[1px] bg-gray-300"></div>

                {/* Right Section */}
                <div className="w-[380px] p-6 text-gray-700 ml-[40px] mt-[50px]">
                    <label className="block text-2xl font-bold text-center mb-4">Enter Credentials</label>
                    <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4">
                        <div className="flex gap-5 mt-[30px]">
                            <label htmlFor="username" className="text-gray-600">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required 
                                placeholder="John@gmail.com"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            />
                        </div>
                        <div className="flex gap-5 mt-[30px]">
                            <label htmlFor="password" className="text-gray-600">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                                placeholder="********"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-[30px]">
                            <input
                                type="checkbox"
                                name="rememberme"
                                id="rememberme"
                                value={formData.rememberme}
                                onChange={handleChange}
                                className="w-5 h-5 rounded-md border-gray-400 text-blue-500 focus:ring-blue-400"
                            />
                            <label htmlFor="rememberme" className="text-gray-700">Remember Me</label>
                        </div>
                        <button type="submit" className="w-full mt-[10px] p-2 text-white font-bold rounded-md bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400 transition">
                            Login
                        </button>
                        <span className="text-sm text-gray-600 text-center">
                            Don't have an account? <a href="/signup" className="text-purple-500 hover:underline">Sign Up</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
