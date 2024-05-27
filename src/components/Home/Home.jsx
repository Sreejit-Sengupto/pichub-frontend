import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import axios from "axios";
import ImagePreviewer from "@/utils/ImageUtils/ImagePreviewer";

export async function loader() {
  try {
    const isLoggedIn = await axios.get("/api/v1/user/status");
    if (isLoggedIn) {
      const response = await axios.get("/api/v1/user/get");
      return response.data;
    }
  } catch (error) {
    return redirect("/login?message=You have been logged out!");
  }
}

const Home = () => {
  const user = useLoaderData();
  const uploads = user.data.uploads;
  const images = uploads.map((item) => {
    return (
      <ImagePreviewer
        imageUrl={item.mediaURL}
        caption={item.caption}
        username={user.data.username}
        uploadedBy={item.uploadedBy}
        key={item._id}
        mediaId={item._id}
        addToGallery={true}
        galleries={user.data.galleries}
      />
    );
  });

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mx-auto">
        {images}
      </div>
    </>
  );
};

export default Home;
