import { ChangeEvent } from "react";
import { useApp } from "../context/AppContext";

export function SvgSizeControl() {
  const { svgSize, setSvgSize } = useApp();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSvgSize(e.target.value);
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        SVG Size: {svgSize}%
      </label>
      <input
        type="range"
        min="10"
        max="90"
        value={svgSize}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
