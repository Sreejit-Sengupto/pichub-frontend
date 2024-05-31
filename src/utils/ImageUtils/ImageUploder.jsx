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

import { Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { createNotification } from "../Functions/notify";

const ImageUploder = () => {
  const [mediaPath, setMediaPath] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [galleries, setGalleries] = React.useState(null);
  const [selectedGallery, setSelectedGallery] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const response = await axios.get(
      "https://pichub-backend-tlwt.onrender.com/api/v1/user/get",
    );
    setGalleries(response.data.data.galleries);
  };

  const handleMediaPath = (event) => {
    setMediaPath(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("media", mediaPath);
    if (selectedGallery) {
      formData.append("galleryId", selectedGallery);
    }
    createNotification(
      axios.post(
        "https://pichub-backend-tlwt.onrender.com/api/v1/media/upload",
        formData,
      ),
      "Uploading...",
      "Uploaded Successfully.",
      "Upload Failed",
    ).then(() =>
      setTimeout(() => {
        window.location.reload();
      }, 2500),
    );
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span>
              <Upload />
            </span>
            <span className="hidden lg:inline text-lg ml-2">Upload</span>
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
                      })}
                  </SelectContent>
                </Select>

                <div className="space-y-2 flex justify-center items-center w-full">
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
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
