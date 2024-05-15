import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserPlus2, UsersRound } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GalleryDetails = ({ galleryName, currentUser }) => {
  const params = useParams();

  const [members, setMembers] = React.useState(null);
  const [newMember, setNewMember] = React.useState("");
  console.log(members);
  console.log(newMember);

  React.useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await axios.get(
      `/api/v1/gallery/get-members/${params.gallery}`,
    );
    setMembers(response.data);
  };

  const addMember = async () => {
    try {
      const response = await axios.post(`/api/v1/gallery/add-member`, {
        username: newMember,
        galleryId: params.gallery,
      });
      console.log(response.data);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const admin = members && members.data.galleryMembers.admin[0].username;
  const galleryMembers =
    members &&
    members.data.galleryMembers.members.filter((item) => item !== admin);

  return (
    <div className="border p-4 w-full flex justify-between items-center">
      <p>{galleryName}</p>

      <div className="flex justify-center items-center">
        {currentUser.data.username === admin && (
          <Popover>
            <PopoverTrigger className="flex justify-center items-center border rounded-md px-4 py-2 mr-2">
              <span className="mr-2">
                <UserPlus2 />
              </span>
              <span>Add</span>
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
        )}

        <Popover>
          <PopoverTrigger className="flex justify-center items-center border rounded-md px-4 py-2">
            <span className="mr-2">
              <UsersRound />
            </span>
            <span>Members</span>
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[200px]">
              <p className="border-b-2 py-1 flex justify-between items-center">
                <span>
                  {admin && admin.charAt(0).toUpperCase() + admin.substring(1)}
                </span>
                <span className="text-xs text-gray-400">Admin</span>
              </p>
              {members &&
                galleryMembers.map((item, index) => {
                  return (
                    <p key={index} className="border-b-2 py-1">
                      {item.charAt(0).toUpperCase() + item.substring(1)}
                    </p>
                  );
                })}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default GalleryDetails;
