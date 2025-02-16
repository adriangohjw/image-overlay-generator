import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { SvgUpload } from "./SvgUpload";
import { SvgSizeControl } from "./SvgSizeControl";
import { TextInput } from "./TextInput";
import { FontSelector } from "./FontSelector";
import { FontSizeControl } from "./FontSizeControl";
import { OpacityControl } from "./OpacityControl";

interface ConfigurationStepsProps {
  onImageUpload: (image: string) => void;
  onSvgUpload: (svg: string | null) => void;
  svgContent: string | null;
  svgSize: string;
  onSvgSizeChange: (size: string) => void;
  overlayText: string;
  onTextChange: (text: string) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  overlayOpacity: string;
  onOpacityChange: (opacity: string) => void;
}

interface Step {
  title: string;
  content: JSX.Element;
}

export function ConfigurationSteps({
  onImageUpload,
  onSvgUpload,
  svgContent,
  svgSize,
  onSvgSizeChange,
  overlayText,
  onTextChange,
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
  overlayOpacity,
  onOpacityChange,
}: ConfigurationStepsProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      title: "1. Choose Your Image & Opacity",
      content: (
        <div className="space-y-4">
          <ImageUpload onImageUpload={onImageUpload} />
          <div className="border-t pt-4">
            <OpacityControl
              overlayOpacity={overlayOpacity}
              onOpacityChange={onOpacityChange}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2. Add & Style Your Text",
      content: (
        <div className="space-y-4">
          <TextInput overlayText={overlayText} onTextChange={onTextChange} />
          <div className="border-t pt-4">
            <div className="space-y-4">
              <FontSelector
                selectedFont={selectedFont}
                onFontChange={onFontChange}
              />
              <FontSizeControl
                fontSize={fontSize}
                onFontSizeChange={onFontSizeChange}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. Add SVG Overlay (Optional)",
      content: (
        <div className="space-y-4">
          <SvgUpload onSvgUpload={onSvgUpload} svgContent={svgContent} />
          {svgContent && (
            <div className="border-t pt-4">
              <SvgSizeControl
                svgSize={svgSize}
                onSvgSizeChange={onSvgSizeChange}
              />
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
