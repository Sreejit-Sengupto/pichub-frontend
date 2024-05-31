import React from "react";
import toast, { Toaster } from "react-hot-toast";
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

import { Trash } from "lucide-react";

import axios from "axios";
axios.defaults.withCredentials = true;
import { createNotification } from "../Functions/notify";

const DeleteImage = ({ mediaId }) => {
  const [deleting, setDeleting] = React.useState(false);
  const deleteMedia = async () => {
    setDeleting(true);
    createNotification(
      axios.delete(
        `https://pichub-backend-tlwt.onrender.com/api/v1/media/delete/${mediaId}`,
        { withCredentials: true },
      ),
      "Deleting",
      "Deleted successfully",
      "Error while deleting",
    )
      .then(() =>
        setTimeout(() => {
          window.location.reload();
        }, 2500),
      )
      .then(() => setDeleting(false))
      .catch(() => setAdding(false));
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className="bg-transparent flex justify-center items-center text-red-700 p-2 border rounded-md"
          disabled={deleting}
        >
          <span>
            <Trash size={"1.4em"} />
          </span>
          <span className="text-lg ml-1">Delete</span>
        </AlertDialogTrigger>

        <AlertDialogContent
          style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
          className="w-[90%] lg:w-[20%]"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
    </>
  );
};

export default DeleteImage;
