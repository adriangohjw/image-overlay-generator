import { ChangeEvent, DragEvent, useState } from "react";

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string | null) => void;
  selectedImage: string | null;
}

export function ImageUpload({
  onImageUpload,
  selectedImage,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleTrySampleImage = () => {
    const img = new Image();
    img.src = "/src/assets/default-image.png";
    img.onload = () => {
      onImageUpload(img.src);
    };
  };

  const handleRemoveImage = () => {
    onImageUpload(null);
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Upload Image
      </label>
      {selectedImage ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center justify-between">
            <span>Image uploaded!</span>
            <button
              onClick={handleRemoveImage}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title=""
            />
            <div className="space-y-4">
              <svg
                className={`mx-auto h-12 w-12 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-600">
                <span className="font-medium">Click to upload</span> or drag and
                drop
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleTrySampleImage}
              className="p-2 rounded-lg inline-flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 border-1 border-blue-600 hover:border-blue-700 font-medium w-full"
            >
              <span role="img" aria-label="sparkles">
                ✨
              </span>
              Try with sample image
              <span role="img" aria-label="sparkles">
                ✨
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
