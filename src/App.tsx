import { useState } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { TextControls } from "./components/TextControls";
import { ImagePreview } from "./components/ImagePreview";

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState("");
  const [fontSize, setFontSize] = useState("24");
  const [wrappedLines, setWrappedLines] = useState<string[]>([]);
  const [overlayOpacity, setOverlayOpacity] = useState("0.4");
  const [selectedFont, setSelectedFont] = useState("Roboto");

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Image Text Overlay Generator
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-5 md:p-6 mb-6">
          <ImageUpload onImageUpload={setSelectedImage} />

          {selectedImage && (
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-1/3">
                <TextControls
                  overlayText={overlayText}
                  fontSize={fontSize}
                  overlayOpacity={overlayOpacity}
                  selectedFont={selectedFont}
                  onTextChange={setOverlayText}
                  onFontSizeChange={setFontSize}
                  onOpacityChange={setOverlayOpacity}
                  onFontChange={setSelectedFont}
                />
              </div>

              <div className="w-full md:w-2/3">
                <ImagePreview
                  selectedImage={selectedImage}
                  overlayText={overlayText}
                  fontSize={fontSize}
                  overlayOpacity={overlayOpacity}
                  selectedFont={selectedFont}
                  wrappedLines={wrappedLines}
                  onWrappedLinesChange={setWrappedLines}
                  onDownload={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
