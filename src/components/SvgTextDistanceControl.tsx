import { useApp } from "../context/AppContext";

export function SvgTextDistanceControl() {
  const { svgTextDistance, setSvgTextDistance } = useApp();

  return (
    <div className="space-y-2">
      <label
        htmlFor="svgTextDistance"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        SVG-Text Distance {svgTextDistance}px
      </label>
      <input
        type="range"
        id="svgTextDistance"
        min="0"
        max="100"
        value={svgTextDistance}
        onChange={(e) => setSvgTextDistance(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
