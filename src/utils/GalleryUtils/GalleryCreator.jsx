import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { createNotification } from "../Functions/notify";

const GalleryCreator = () => {
  const [galleryName, setGalleryName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleCreateGallery = async () => {
    createNotification(
      axios.post(
        `https://pichub-backend-tlwt.onrender.com/api/v1/gallery/create`,
        {
          galleryName: galleryName,
        },
        {
          withCredentials: true,
        },
      ),
      "Creating Gallery",
      "Gallery created successfully",
      "Failed to create gallery",
    ).then(() =>
      setTimeout(() => {
        window.location.reload();
      }, 2500),
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-auto">
        <PlusSquare />
      </DialogTrigger>
      <DialogContent
        className="w-[90%] lg:w-[20%]"
        style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
      >
        <DialogHeader>
          <DialogTitle className="mb-2">Create Gallery</DialogTitle>
          <DialogDescription>
            <Input
              placeholder="Enter gallery name"
              value={galleryName}
              onChange={(event) => {
                setGalleryName(event.target.value);
              }}
            />
            <Button className="w-full mt-2" onClick={handleCreateGallery}>
              Create Gallery
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryCreator;
