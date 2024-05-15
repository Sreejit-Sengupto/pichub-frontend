import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";

const ImagePreviewer = ({ mediaId, imageUrl, caption }) => {
  const deleteMedia = async () => {
    const response = await axios.delete(`/api/v1/media/delete/${mediaId}`);
    console.log(response.data);
    window.location.reload();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <img src={imageUrl} alt="image" />
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>
              <img src={imageUrl} alt="image" className="w-full" />
            </DialogTitle>
            <DialogDescription>
              <span className="italic my-2">&quot;{caption}&quot;</span>
            </DialogDescription>
            <DialogDescription>
              {/* <Button className="bg-red-700 hover:bg-red-500 ml-auto flex justify-center items-center">
                <span> */}
              {/* <Trash /> */}
              <AlertDialog>
                <AlertDialogTrigger className="bg-red-700 hover:bg-red-500 ml-auto flex justify-center items-center text-white p-2 rounded-md">
                  <span>
                    <Trash />
                  </span>
                  <span className="text-lg ml-1">Delete</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      The media will be permenantly deleted and removed from the
                      galleries as well.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-transparent border rounded-md text-red-500 hover:bg-transparent"
                      onClick={deleteMedia}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* </span>
                <span className="text-lg ml-1">Delete</span>
              </Button> */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreviewer;
