import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LogOutIcon, Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const ImageUploder = () => {
  const [mediaPath, setMediaPath] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [galleries, setGalleries] = React.useState(null);
  const [selectedGallery, setSelectedGallery] = React.useState(null);

  console.log(selectedGallery);

  console.log(galleries);

  console.log(caption);

  console.log(mediaPath);

  React.useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const response = await axios.get("/api/v1/user/get");
    setGalleries(response.data.data.galleries);
  };

  const handleMediaPath = (event) => {
    setMediaPath(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // const mediaName = mediaPath.name.substring(0, mediaPath.name.indexOf("."));
    formData.append("caption", caption);
    formData.append("media", mediaPath);
    if (selectedGallery) {
      formData.append("galleryId", selectedGallery);
    }

    axios
      .post("/api/v1/media/upload", formData)
      .then((response) => console.log(response.data))
      .then(setMediaPath(""))
      .then(() => window.location.reload());
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span>
              <Upload />
            </span>
            <span className="text-lg ml-2">Upload Image</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <form onSubmit={handleUpload}>
                <Input
                  type="file"
                  name="uploaded media"
                  onChange={handleMediaPath}
                />
                <Input
                  type="text"
                  name="caption"
                  value={caption}
                  placeholder="Caption..."
                  onChange={(event) => setCaption(event.target.value)}
                  className="my-4"
                />

                {/* <p className="mt-2 text-gray-400">Select Gallery</p>
                <ScrollArea className="h-[200px] rounded-md border p-4 mb-2">
                  {galleries && galleries.map((item) => {
                    return <p key={item._id} className="border p-3 rounded-lg cursor-pointer">{item.galleryName}</p>
                  })}
                </ScrollArea> */}

                <Select onValueChange={setSelectedGallery}>
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Add to gallery" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleries &&
                      galleries.map((item) => {
                        return (
                          <SelectItem value={item._id} key={item._id}>
                            {item.galleryName}
                          </SelectItem>
                        );
                        // return <p key={item._id} className="border p-3 rounded-lg cursor-pointer">{item.galleryName}</p>
                      })}
                  </SelectContent>
                </Select>

                <div className="space-y-2 flex justify-center items-center w-full">
                  <Button type="submit" className="w-full">
                    <span>Upload</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ImageUploder;
