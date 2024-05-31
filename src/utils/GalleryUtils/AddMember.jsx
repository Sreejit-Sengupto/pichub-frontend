import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserPlus2 } from "lucide-react";
import axios from "axios";
axios.defaults.withCredentials = true
import { useParams } from "react-router-dom";
import { createNotification } from "../Functions/notify";

const AddMember = () => {
  const params = useParams();
  const [newMember, setNewMember] = React.useState("");
  const addMember = async () => {
    setNewMember("");
    createNotification(
      axios.post(
        `https://pichub-backend-tlwt.onrender.com/api/v1/gallery/add-member`,
        {
          username: newMember,
          galleryId: params.gallery,
        },
      ),
      `Adding ${newMember}`,
      `Added ${newMember} successfully`,
      `Failed to add ${newMember}. Make sure the username is correct.`,
    ).then(() =>
      setTimeout(() => {
        window.location.reload();
      }, 2500),
    );
  };
  return (
    <Popover>
      <PopoverTrigger className="flex justify-center items-center border rounded-md px-4 py-2 mr-2">
        <span className="lg:mr-2">
          <UserPlus2 />
        </span>
        <span className="hidden lg:inline">Add</span>
      </PopoverTrigger>
      <PopoverContent>
        <Input
          placeholder="Enter username"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <Button className="w-full mt-2" onClick={addMember}>
          Add member
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AddMember;
