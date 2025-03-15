import React from "react";

const Terminal = () => {
  return (
    <div className="h-32 bg-black text-green-400 p-2 text-sm">
      <p>$ npm start</p>
      <p>Server running at http://localhost:3000</p>
    </div>
  );
};

export default Terminal;
