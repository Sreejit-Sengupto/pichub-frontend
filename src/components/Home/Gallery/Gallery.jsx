import React from "react";
import { redirect, useLoaderData, useParams } from "react-router-dom";
import ImagePreviewer from "@/utils/ImagePreviewer";
import axios from "axios";
import GalleryDetails from "./GalleryDetails";

export async function loader() {
  try {
    const isLoggedIn = await axios.get("/api/v1/user/status");
    if (isLoggedIn) {
      return isLoggedIn.data;
    }
  } catch (error) {
    return redirect("/login");
  }
}
const Gallery = () => {
  const params = useParams();
  console.log(params);

  const currentUser = useLoaderData();

  const [images, setImages] = React.useState();
  console.log(images);

  React.useEffect(() => {
    getImages();
  }, []);
  const getImages = async () => {
    const response = await axios.get(
      `/api/v1/gallery/get-images/${params.gallery}`,
    );
    setImages(response.data);
  };
  return (
    <div className="flex flex-col">
      <GalleryDetails
        galleryName={images && images.data.galleryName}
        currentUser={currentUser}
      />
      <div className="w-full grid grid-cols-4 gap-2 p-4">
        {images &&
          images.data.images.map((item) => {
            // return <img src={item.mediaURL} alt="img" className="rounded-md object-cover border"/>;
            return (
              <ImagePreviewer
                imageUrl={item.mediaURL}
                caption={item.caption}
                key={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
