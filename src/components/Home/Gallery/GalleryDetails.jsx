import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UsersRound } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
axios.defaults.withCredentials = true
import { useParams } from "react-router-dom";
import DeleteGallery from "@/utils/GalleryUtils/DeleteGallery";
import AddMember from "@/utils/GalleryUtils/AddMember";

const GalleryDetails = ({ galleryName, currentUser }) => {
  const params = useParams();

  const [members, setMembers] = React.useState(null);

  React.useEffect(() => {
    fetchMembers();
  }, [params]);

  const fetchMembers = async () => {
    const response = await axios.get(
      `https://pichub-backend-tlwt.onrender.com/api/v1/gallery/get-members/${params.gallery}`,
    );
    setMembers(response.data);
  };

  const admin = members && members.data.galleryMembers.admin[0].username;
  const galleryMembers =
    members &&
    members.data.galleryMembers.members.filter((item) => item !== admin);

  return (
    <div className="border border-l-0 p-4 w-full flex justify-between items-center">
      <p className="w-[40%] p-1 overflow-x-auto">{galleryName}</p>

      <div className="flex justify-center items-center">
        {currentUser.data.username === admin && <AddMember />}

        <Popover>
          <PopoverTrigger className="flex justify-center items-center border rounded-md px-4 py-2">
            <span className="lg:mr-2">
              <UsersRound />
            </span>
            <span className="hidden lg:inline">Members</span>
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

        {currentUser.data.username === admin && (
          <DeleteGallery galleryId={params.gallery} />
        )}
      </div>
    </div>
  );
};

export default GalleryDetails;
