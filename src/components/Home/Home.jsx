import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import ImagePreviewer from "@/utils/ImagePreviewer";

export async function loader() {
  try {
    const isLoggedIn = await axios.get("/api/v1/user/status");
    if (isLoggedIn) {
      const response = await axios.get("/api/v1/user/get");
      return response.data;
    }
  } catch (error) {
    return redirect("/login");
  }
}

const Home = () => {
  // const { user, logout } = useAuth();
  const user = useLoaderData();
  console.log(user);
  const uploads = user.data.uploads;
  const images = uploads.map((item) => {
    return (
      // <img
      //   src={item.mediaURL}
      //   alt="Photo by Drew Beamer"
      //   className="rounded-md object-cover border"
      //   key={item._id}
      // />
      <ImagePreviewer
        imageUrl={item.mediaURL}
        caption={item.caption}
        key={item._id}
        mediaId={item._id}
      />
    );
  });

  return (
    <div className="w-full grid grid-cols-4 gap-2 p-4">
      {images}
      {/* <ImagePreviewer /> */}
      {/* <Outlet /> */}
    </div>
  );
};

export default Home;
