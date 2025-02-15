interface TextControlsProps {
  overlayText: string
  fontSize: string
  onTextChange: (text: string) => void
  onFontSizeChange: (size: string) => void
}

export function TextControls({
  overlayText,
  fontSize,
  onTextChange,
  onFontSizeChange,
}: TextControlsProps) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Overlay Text
        </label>
        <input
          type="text"
          value={overlayText}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter text to overlay"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            className="w-full"
            min="12"
            max="72"
            step="1"
          />
        </div>
      </div>
    </>
  )
} 