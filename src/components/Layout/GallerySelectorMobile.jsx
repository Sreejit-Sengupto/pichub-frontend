import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { GalleryHorizontalEndIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import GalleryCreator from "@/utils/GalleryUtils/GalleryCreator";

const GallerySelectorMobile = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex ml-2 lg:hidden justify-center items-center rounded-md border px-4 py-[7px]">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <GalleryHorizontalEndIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex justify-center items-center">
              <p>Your Galleries</p>
              <p className="ml-auto text-gray-400">
                <GalleryCreator />
              </p>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={() => setOpen(false)}
              className="bg-transparent border-2 rounded-md"
            >
              <NavLink to={`/home`}>All Media</NavLink>
            </Button>
            {user.data.galleries.map((item) => {
              return (
                <NavLink
                  onClick={() => setOpen(false)}
                  to={`/home/${item._id}`}
                  key={item._id}
                >
                  <Button className="w-full">{item.galleryName}</Button>
                </NavLink>
              );
            })}
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default GallerySelectorMobile;
