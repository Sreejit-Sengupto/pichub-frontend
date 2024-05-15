import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import GallerySelector from "./GallerySelector";

export async function loader() {
  const isLoggedIn = await axios.get("/api/v1/user/status");
  if (!isLoggedIn) {
    return redirect("/login");
  }
  const response = await axios.get("/api/v1/user/get");
  return response.data;
}

const Layout = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div>
      <Navbar user={user} />

      <div className="w-full h-screen flex">
        <div className="w-[20%] border">
          <GallerySelector user={user} />
        </div>
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
