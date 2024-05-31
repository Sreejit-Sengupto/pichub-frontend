import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import GallerySelector from "./GallerySelector";

export async function loader() {
  const isLoggedIn = await axios.get(
    "https://pichub-backend-tlwt.onrender.com/api/v1/user/status",
  );
  if (!isLoggedIn) {
    return redirect("/login");
  }
  const response = await axios.get(
    "https://pichub-backend-tlwt.onrender.com/api/v1/user/get",
  );
  return response.data;
}

const Layout = () => {
  const user = useLoaderData();
  return (
    <div>
      <Navbar user={user} />

      <div className="w-full h-[100dvh] flex lg:flex-row flex-col">
        <div className="hidden lg:block w-[20%] border border-r-0 bg-[#1B1212]">
          <GallerySelector user={user} />
        </div>
        <div className="w-full lg:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
