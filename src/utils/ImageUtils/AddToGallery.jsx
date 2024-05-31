import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash } from "lucide-react";

import axios from "axios";
axios.defaults.withCredentials = true;
import { createNotification } from "../Functions/notify";

const AddToGallery = ({ galleries, mediaId }) => {
  const [selectedGallery, setSelectedGallery] = React.useState(null);
  const [adding, setAdding] = React.useState(false);

  const addMediaToGallery = async () => {
    setAdding(true);
    createNotification(
      axios.post(
        `https://pichub-backend-tlwt.onrender.com/api/v1/media/add-to-gallery/${selectedGallery}`,
        {
          mediaId,
        },
        {
          withCredentials: true,
        },
      ),
      "Adding to Gallery",
      "Added to Gallery",
      "Failed to add to Gallery",
    )
      .then(() =>
        setTimeout(() => {
          window.location.reload();
        }, 2500),
      )
      .then(() => setAdding(false))
      .catch(() => setAdding(false));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="bg-transparent flex justify-center items-center text-primary p-2 border rounded-md"
        disabled={adding}
      >
        <span>
          <Trash size={"1.4em"} />
        </span>
        <span className="text-lg ml-1">Add to gallery</span>
      </AlertDialogTrigger>

      <AlertDialogContent
        style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
        className="w-[90%] lg:w-[20%]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Select gallery</AlertDialogTitle>
          <AlertDialogDescription>
            <Select onValueChange={setSelectedGallery}>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Add to gallery" />
              </SelectTrigger>
              <SelectContent>
                {galleries &&
                  galleries.map((item) => {
                    return (
                      <SelectItem value={item._id} key={item._id}>
                        {item.galleryName}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={addMediaToGallery}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddToGallery;
