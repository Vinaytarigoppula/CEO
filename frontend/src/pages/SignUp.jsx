import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update field value dynamically
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data.message); // Show success or error message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-pink-400 to-cyan-400">
      <div className="w-[600px] h-[500px] flex bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <div className="w-[160px] flex flex-col items-center justify-center p-4 text-2xl font-bold text-gray-800 bg-gray-100">
          SignUp
        </div>
        <div className="w-[1px] bg-gray-300"></div>
        <div className="w-[380px] p-6 text-gray-700 ml-[30px]">
          <label className="block text-2xl font-bold text-center mb-4">Enter Your Details</label>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center mt-[40px]">
              <label htmlFor="email" className="w-[100px] text-gray-600">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="John@gmail.com"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center mt-[20px]">
              <label htmlFor="username" className="w-[100px] text-gray-600">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="king Nagarjuna"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center mt-[20px]">
              <label htmlFor="password" className="w-[100px] text-gray-600">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button type="submit" className="w-full mt-10 p-2 text-white font-bold rounded-md bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
