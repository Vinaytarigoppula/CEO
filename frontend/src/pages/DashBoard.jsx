import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import Explorer from "../components/Explorer";
import MonacoEditor from "../components/MonacoEditor";
import Terminal from "../components/Terminal";

const DashBoard = () => {
  return (
    <div className="w-screen">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <Explorer />
        <div className="flex flex-col w-full">
        <MonacoEditor />
        {/* <Terminal /> */}
        </div>
       
       
      </div>
     
    </div>
  );
};

export default DashBoard;
