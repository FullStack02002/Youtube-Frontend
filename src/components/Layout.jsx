import React from "react";
import { Navbar, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
     <div className="max-w-screen-2xl mx-auto">
     <Navbar />
      <Sidebar />
      <div className="w-full sm:w-[85%]  sm:ml-[123px] xl:ml-[226px] md:pl-[10px] ">
        <Outlet />
      </div>
     </div>
    </>
  );
};
