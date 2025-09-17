import React from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="flex">
       <div className="w-[20%]">
            <Sidebar></Sidebar>
       </div>
      <div className="w-[80%]">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
