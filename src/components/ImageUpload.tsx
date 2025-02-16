import { FileUpload } from "./FileUpload";
import { useApp } from "../context/AppContext";
import defaultImage from "../assets/default-image.png";

export function ImageUpload() {
  const { selectedImage, setSelectedImage } = useApp();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTrySampleImage = () => {
    const img = new Image();
    img.src = defaultImage;
    img.onload = () => {
      setSelectedImage(img.src);
    };
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <FileUpload
      onFileUpload={handleImageUpload}
      hasFile={!!selectedImage}
      onRemove={handleRemoveImage}
      accept="image/*"
      label="Upload Image"
      uploadedMessage="Image uploaded!"
      handleTrySampleImage={handleTrySampleImage}
    />
  );
}
