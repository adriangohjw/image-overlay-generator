import { useState } from "react";
import { ImagePreview } from "./components/ImagePreview";
import defaultImage from "./assets/default-image.png";
import { fonts } from "./constants/Fonts";
import { FeaturesShowcase } from "./components/FeaturesShowcase";
import { Footer } from "./components/Footer";
import { ConfigurationSteps } from "./components/ConfigurationSteps";

function App() {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [overlayText, setOverlayText] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("28");
  const [wrappedLines, setWrappedLines] = useState<string[]>([]);
  const [overlayOpacity, setOverlayOpacity] = useState<string>("0.4");
  const [selectedFont, setSelectedFont] = useState<string>(fonts[0].name);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgSize, setSvgSize] = useState<string>("50"); // Default to 50%

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 md:mb-8">
          Image Text Overlay Generator
        </h1>

        <FeaturesShowcase />

        <div className="bg-white rounded-lg shadow-lg p-5 md:p-6">
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <ConfigurationSteps
                onImageUpload={setSelectedImage}
                onSvgUpload={setSvgContent}
                svgContent={svgContent}
                svgSize={svgSize}
                onSvgSizeChange={setSvgSize}
                overlayText={overlayText}
                onTextChange={setOverlayText}
                selectedFont={selectedFont}
                onFontChange={setSelectedFont}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
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
                svgContent={svgContent}
                svgSize={svgSize}
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
