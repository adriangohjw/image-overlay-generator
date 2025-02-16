import { useApp } from "../context/AppContext";

export function OpacityControl() {
  const { overlayOpacity, setOverlayOpacity } = useApp();

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Overlay Darkness: {Math.round(parseFloat(overlayOpacity) * 100)}%
      </label>
      <input
        type="range"
        value={overlayOpacity}
        onChange={(e) => setOverlayOpacity(e.target.value)}
        className="w-full"
        min="0"
        max="1"
        step="0.1"
      />
    </div>
  );
}
