interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const fonts = [
  {
    name: "Roboto",
    displayName: "Roboto",
    description: "Clean and modern",
  },
  {
    name: "Open Sans",
    displayName: "Open Sans",
    description: "Friendly and approachable",
  },
  {
    name: "Montserrat",
    displayName: "Montserrat",
    description: "Contemporary sans-serif",
  },
  {
    name: "Playfair Display",
    displayName: "Playfair Display",
    description: "Elegant serif",
  },
  {
    name: "Lato",
    displayName: "Lato",
    description: "Balanced and modern",
  },
  {
    name: "Merriweather",
    displayName: "Merriweather",
    description: "Classic serif",
  },
];

export function FontSelector({
  selectedFont,
  onFontChange,
}: FontSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Font Style
      </label>
      <div className="grid grid-cols-2 gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onFontChange(font.name)}
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
