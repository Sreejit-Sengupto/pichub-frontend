import React from "react";
import { Button } from "../ui/button";
import { LogOutIcon, UserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import ImageUploder from "@/utils/ImageUploder";

const Navbar = ({ user }) => {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    axios.post("/api/v1/user/logout").then(() => navigate("/login"));
  };

  return (
    <div className="flex justify-between items-center p-4 border">
      <p className="text-2xl font-semibold text-primary">Pichub</p>

      <div className="flex justify-center items-center">
        <div className="mr-2">
          <ImageUploder />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <span className="text-lg mr-2">
                {user.data.username.charAt(0).toUpperCase() +
                  user.data.username.substring(1)}
              </span>
              <span>
                <UserRound />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <p className="text-center">_id: {user.data._id}</p>
              </div>
              <div className="space-y-2">
                <button
                  className="mx-auto w-full flex justify-center items-center border p-3 rounded-lg text-red-500"
                  onClick={logout}
                >
                  <span>Logout</span>
                  <span className="ml-2">
                    <LogOutIcon />
                  </span>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
