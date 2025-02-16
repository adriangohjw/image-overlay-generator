import { ChangeEvent } from "react";

interface SvgSizeControlProps {
  svgSize: string;
  onSvgSizeChange: (size: string) => void;
}

export function SvgSizeControl({
  svgSize,
  onSvgSizeChange,
}: SvgSizeControlProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSvgSizeChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        SVG Size: {svgSize}%
      </label>
      <input
        type="range"
        min="10"
        max="50"
        value={svgSize}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
