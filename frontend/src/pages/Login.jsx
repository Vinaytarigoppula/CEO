import React from 'react';

const Login = () => {
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
        <div className="w-[380px] p-6 text-gray-700 ml-[50px] mt-[50px]">
          <label className="block text-2xl font-bold text-center mb-4">Login Credentials</label>
          <form action="/login" method="post" className="flex flex-col space-y-4">
          <div className='flex gap-5 mt-[30px]'>
              <label htmlFor="username" className="text-gray-600">Username:</label>
              <input type="text" id="username" name="username" required 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className='flex gap-5 mt-[30px]'>
              <label htmlFor="password" className="text-gray-600">Password:</label>
              <input type="password" id="password" name="password" required 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button type="submit" className="w-full mt-[70px] p-2 text-white font-bold rounded-md bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400 transition">
              Login
            </button>
            <span className="text-sm text-gray-600 text-center">
              Don't have an account? <a href="/register" className="text-purple-500 hover:underline">Register</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
