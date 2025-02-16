interface TextInputProps {
  overlayText: string;
  onTextChange: (text: string) => void;
}

export function TextInput({ overlayText, onTextChange }: TextInputProps) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Overlay Text
      </label>
      <input
        type="text"
        value={overlayText}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter optional text to overlay"
      />
    </div>
  );
}
