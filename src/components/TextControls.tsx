import { FontSelector } from "./FontSelector";

interface TextControlsProps {
  overlayText: string;
  fontSize: string;
  overlayOpacity: string;
  selectedFont: string;
  onTextChange: (text: string) => void;
  onFontSizeChange: (size: string) => void;
  onOpacityChange: (opacity: string) => void;
  onFontChange: (font: string) => void;
}

export function TextControls({
  overlayText,
  fontSize,
  overlayOpacity,
  selectedFont,
  onTextChange,
  onFontSizeChange,
  onOpacityChange,
  onFontChange,
}: TextControlsProps) {
  return (
    <>
      <div className="">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Overlay Text
        </label>
        <input
          type="text"
          value={overlayText}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter text to overlay"
        />
      </div>

      <FontSelector selectedFont={selectedFont} onFontChange={onFontChange} />

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          value={fontSize}
          onChange={(e) => onFontSizeChange(e.target.value)}
          className="w-full"
          min="12"
          max="72"
          step="1"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Overlay Darkness: {Math.round(parseFloat(overlayOpacity) * 100)}%
        </label>
        <input
          type="range"
          value={overlayOpacity}
          onChange={(e) => onOpacityChange(e.target.value)}
          className="w-full"
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </>
  );
}
