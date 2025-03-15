import React from "react";

const Explorer = () => {
  return (
    <div className="w-60 bg-gray-800 text-white p-2">
      <h2 className="text-sm font-bold mb-2">EXPLORER</h2>
      <ul className="text-sm">
        <li className="p-1 hover:bg-gray-700 rounded">index.js</li>
        <li className="p-1 hover:bg-gray-700 rounded">App.jsx</li>
        <li className="p-1 hover:bg-gray-700 rounded">components/Sidebar.jsx</li>
      </ul>
    </div>
  );
};

export default Explorer;
