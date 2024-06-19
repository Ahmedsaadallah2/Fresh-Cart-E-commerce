import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container pt-24 pb-[320px] md:pb-[255px]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
