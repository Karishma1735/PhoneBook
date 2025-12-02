import React from "react";
import axios from "axios";

function ImageUploader({ onUpload }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Phonebook_images");
    formData.append("cloud_name", "dtvwypwen");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtvwypwen/image/upload",
        formData
      );

      console.log("Upload successful:", response.data);
      onUpload({
        imageUrl: response.data.secure_url,
        imagePublicId: response.data.public_id,
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      style={{ margin: "10px" }}
    />
  );
}

export default ImageUploader;
