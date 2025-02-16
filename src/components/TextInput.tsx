import { useApp } from "../context/AppContext";

export function TextInput() {
  const { overlayText, setOverlayText } = useApp();

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Overlay Text
      </label>
      <input
        type="text"
        value={overlayText}
        onChange={(e) => setOverlayText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter optional text to overlay"
      />
    </div>
  );
}
