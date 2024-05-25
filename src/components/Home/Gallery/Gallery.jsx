import React from "react";
import { redirect, useLoaderData, useParams } from "react-router-dom";
import ImagePreviewer from "@/utils/ImageUtils/ImagePreviewer";
import axios from "axios";
import GalleryDetails from "./GalleryDetails";
import SkeletonLoader from "@/utils/SkeletonLoader";

export async function loader() {
  try {
    const isLoggedIn = await axios.get("https://pichub-backend-tlwt.onrender.com/api/v1/user/status");
    if (isLoggedIn) {
      return isLoggedIn.data;
    }
  } catch (error) {
    return redirect("/login");
  }
}
const Gallery = () => {
  const params = useParams();

  const currentUser = useLoaderData();

  const [images, setImages] = React.useState();

  React.useEffect(() => {
    getImages();
  }, [params]);
  const getImages = async () => {
    const response = await axios.get(
      `https://pichub-backend-tlwt.onrender.com/api/v1/gallery/get-images/${params.gallery}`,
    );
    setImages(response.data);
  };

  return (
    <div className="flex flex-col">
      <GalleryDetails
        galleryName={images && images.data.galleryName}
        currentUser={currentUser}
      />
      {images && images.data.images.length === 0 && (
        <p className="flex justify-center items-center h-[500px] text-gray-500">
          No images in this Gallery
        </p>
      )}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mx-auto">
        {images ? (
          images.data.images.map((item) => {
            return (
              <ImagePreviewer
                imageUrl={item.mediaURL}
                caption={item.caption}
                mediaId={item._id}
                username={currentUser.data.username}
                uploadedBy={item.uploadedBy}
                key={item._id}
                addToGallery={false}
              />
            );
          })
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </div>
  );
};

export default Gallery;
