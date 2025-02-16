import { fonts } from "../constants/Fonts";
import { useApp } from "../context/AppContext";

export function FontSelector() {
  const { selectedFont, setSelectedFont } = useApp();

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Font Style
      </label>
      <div className="grid grid-cols-2 gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => setSelectedFont(font.name)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border transition-all ${
              selectedFont === font.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className="text-md md:text-lg"
              style={{ fontFamily: font.name }}
            >
              {font.displayName}
            </div>
            <div className="text-xs text-gray-500">{font.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
