import { useState } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { ImagePreview } from "./components/ImagePreview";
import defaultImage from "./assets/default-image.png";
import { fonts } from "./constants/Fonts";
import { TextInput } from "./components/TextInput";
import { FontSelector } from "./components/FontSelector";
import { FontSizeControl } from "./components/FontSizeControl";
import { OpacityControl } from "./components/OpacityControl";
import { FeaturesShowcase } from "./components/FeaturesShowcase";
import { Footer } from "./components/Footer";
function App() {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [overlayText, setOverlayText] = useState(
    "This is the default text. Replace me!"
  );
  const [fontSize, setFontSize] = useState("28");
  const [wrappedLines, setWrappedLines] = useState<string[]>([]);
  const [overlayOpacity, setOverlayOpacity] = useState("0.4");
  const [selectedFont, setSelectedFont] = useState(fonts[0].name);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Image Text Overlay Generator
        </h1>

        <FeaturesShowcase />

        <div className="bg-white rounded-lg shadow-lg p-5 md:p-6">
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <ImageUpload onImageUpload={setSelectedImage} />
              <TextInput
                overlayText={overlayText}
                onTextChange={setOverlayText}
              />
              <FontSelector
                selectedFont={selectedFont}
                onFontChange={setSelectedFont}
              />
              <FontSizeControl
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
              />
              <OpacityControl
                overlayOpacity={overlayOpacity}
                onOpacityChange={setOverlayOpacity}
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
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
