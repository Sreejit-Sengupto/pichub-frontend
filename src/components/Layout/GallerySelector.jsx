import {
  GalleryHorizontalEndIcon,
  PlusCircleIcon,
  PlusSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";

const GallerySelector = ({ user }) => {
  console.log(user.data.galleries);
  return (
    <div className="w-full">
      <h2 className="text-lg text-gray-400 my-5 flex justify-start items-center mx-4">
        <span>Galleries</span>
        <span className="ml-2">
          <GalleryHorizontalEndIcon />
        </span>

        <Dialog>
          <DialogTrigger className="ml-auto">
            <PlusSquare />
          </DialogTrigger>
          <DialogContent className="w-[20%]">
            <DialogHeader>
              <DialogTitle className="mb-2">Create Gallery</DialogTitle>
              <DialogDescription>
                <Input placeholder="Enter gallery name" />
                <Button className="w-full mt-2">Create Gallery</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </h2>
      <NavLink
        to={"/home"}
        className={({ isActive }) =>
          isActive
            ? "bg-primary block w-full p-5 rounded-lg"
            : "block w-full p-5 rounded-lg"
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
                ? "bg-primary block w-full p-5 rounded-lg my-2"
                : "block w-full p-5 rounded-lg my-2"
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
