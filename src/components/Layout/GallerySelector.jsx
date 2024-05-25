import GalleryCreator from "@/utils//GalleryUtils/GalleryCreator";
import { GalleryHorizontalEndIcon } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const GallerySelector = ({ user }) => {
  const location = useLocation();
  return (
    <div className="w-full">
      <h2 className="text-lg text-gray-400 my-6 flex justify-start items-center mx-4">
        <span>Galleries</span>
        <span className="ml-2">
          <GalleryHorizontalEndIcon />
        </span>
        <GalleryCreator />
      </h2>
      <NavLink
        to={"/home"}
        className={
          location.pathname === "/home"
            ? "bg-background block w-full p-5 rounded-l-full my-2 relative text-primary curve"
            : "block w-full p-5 rounded-l-full my-2"
        }
      >
        All Media
      </NavLink>

      {user.data.galleries.map((item) => {
        return (
          <NavLink
            to={`/home/${item._id}`}
            key={item._id}
            className={({ isActive }) =>
              isActive
                ? "bg-background block w-full p-5 rounded-l-full my-2 relative curve text-primary"
                : "block w-full p-5 rounded-l-full my-2"
            }
          >
            {item.galleryName}
          </NavLink>
        );
      })}
    </div>
  );
};

export default GallerySelector;
