import { useApp } from "../context/AppContext";

export function OverlayStyleControl() {
  const { overlayStyle, setOverlayStyle } = useApp();

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Overlay Style
      </label>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200 
            ${
              overlayStyle === "solid"
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          onClick={() => setOverlayStyle("solid")}
        >
          Solid
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 border-gray-200 
            ${
              overlayStyle === "radial"
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          onClick={() => setOverlayStyle("radial")}
        >
          Radial
        </button>
      </div>
    </div>
  );
}
