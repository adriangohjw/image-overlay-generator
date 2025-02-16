import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { SvgUpload } from "./SvgUpload";
import { SvgSizeControl } from "./SvgSizeControl";
import { TextInput } from "./TextInput";
import { FontSelector } from "./FontSelector";
import { FontSizeControl } from "./FontSizeControl";
import { OpacityControl } from "./OpacityControl";
import { useApp } from "../context/AppContext";

interface Step {
  title: string;
  content: JSX.Element;
}

export function ConfigurationSteps() {
  const { selectedImage, svgContent, overlayText } = useApp();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      title: "1. Choose Your Image & Opacity",
      content: (
        <div className="space-y-4">
          <ImageUpload />
          {selectedImage && (
            <div className="border-t pt-4">
              <OpacityControl />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "2. Add & Style Your Text (Optional)",
      content: (
        <div className="space-y-4">
          <TextInput />
          <div className="border-t pt-4">
            <div className="space-y-4">
              <FontSelector />
              {overlayText && <FontSizeControl />}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. Add SVG Overlay (Optional)",
      content: (
        <div className="space-y-4">
          <SvgUpload />
          {svgContent && (
            <div className="border-t pt-4">
              <SvgSizeControl />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className={`w-full px-4 py-3 text-left font-medium flex justify-between items-center ${
              activeStep === index ? "bg-blue-50" : "bg-white"
            }`}
            onClick={() => setActiveStep(activeStep === index ? -1 : index)}
          >
            <span>{step.title}</span>
            <span className="transform transition-transform duration-200">
              {activeStep === index ? "−" : "+"}
            </span>
          </button>
          {activeStep === index && (
            <div className="p-4 bg-white border-t">{step.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
