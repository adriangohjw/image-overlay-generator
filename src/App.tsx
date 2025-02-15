import { useState, ChangeEvent, useRef } from 'react'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [overlayText, setOverlayText] = useState('')
  const [fontSize, setFontSize] = useState('24')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleDownload = () => {
    if (!imageContainerRef.current) return

    const canvas = document.createElement('canvas')
    const container = imageContainerRef.current
    const img = container.querySelector('img')

    if (!img) return

    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // Add semi-transparent black overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add text
    ctx.fillStyle = textColor
    ctx.font = `${Math.floor(canvas.height * parseInt(fontSize) / 400)}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(overlayText, canvas.width / 2, canvas.height / 2)

    // Create download link
    const link = document.createElement('a')
    link.download = 'edited-image.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Image Text Overlay</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>

          {selectedImage && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Overlay Text
                </label>
                <input
                  type="text"
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter text to overlay"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Font Size (px)
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full p-2 border rounded"
                    min="12"
                    max="72"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full p-1 border rounded h-10"
                  />
                </div>
              </div>

              <div className="relative w-full aspect-video" ref={imageContainerRef}>
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <p
                    style={{
                      fontSize: `${fontSize}px`,
                      color: textColor,
                    }}
                    className="text-center px-4"
                  >
                    {overlayText}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Download Edited Image
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
