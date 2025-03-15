import React from "react";
import { Home, File, Terminal, Settings } from "lucide-react"; // VS Code-style icons

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-gray-900 text-white flex flex-col items-center py-4">
      <button className="p-3 hover:bg-gray-700 rounded"><Home size={24} /></button>
      <button className="p-3 hover:bg-gray-700 rounded"><File size={24} /></button>
      <button className="p-3 hover:bg-gray-700 rounded"><Terminal size={24} /></button>
      <button className="p-3 mt-auto hover:bg-gray-700 rounded"><Settings size={24} /></button>
    </div>
  );
};

export default Sidebar;
