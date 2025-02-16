import { useApp } from "../context/AppContext";

export function SvgPositionControl() {
  const { svgPosition, setSvgPosition, svgContent, overlayText } = useApp();

  if (!svgContent || !overlayText.trim()) {
    return null;
  }

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        SVG Position
      </label>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200 
            ${
              svgPosition === "above"
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          onClick={() => setSvgPosition("above")}
        >
          Above Text
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 border-gray-200 
            ${
              svgPosition === "below"
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          onClick={() => setSvgPosition("below")}
        >
          Below Text
        </button>
      </div>
    </div>
  );
}
