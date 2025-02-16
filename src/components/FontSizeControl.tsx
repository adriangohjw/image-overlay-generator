import { useApp } from "../context/AppContext";

export function FontSizeControl() {
  const { fontSize, setFontSize } = useApp();

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Font Size: {fontSize}px
      </label>
      <input
        type="range"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className="w-full"
        min="12"
        max="72"
        step="1"
      />
    </div>
  );
}
