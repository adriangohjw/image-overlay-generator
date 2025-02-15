import { useState, ChangeEvent, useRef, useEffect } from 'react'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [overlayText, setOverlayText] = useState('')
  const [fontSize, setFontSize] = useState('24')
  const [wrappedLines, setWrappedLines] = useState<string[]>([])
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Function to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0] || ''

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(`${currentLine} ${word}`).width
      if (width < maxWidth) {
        currentLine += ` ${word}`
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  // Calculate wrapped lines whenever text, font size, or image changes
  useEffect(() => {
    if (!imageContainerRef.current || !selectedImage) return

    const canvas = document.createElement('canvas')
    const img = imageContainerRef.current.querySelector('img')
    if (!img) return

    const calculateWrappedLines = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const calculatedFontSize = Math.floor(canvas.height * parseInt(fontSize) / 400)
      ctx.font = `${calculatedFontSize}px Arial`
      
      const maxWidth = canvas.width * 0.8
      const lines = wrapText(ctx, overlayText, maxWidth)
      setWrappedLines(lines)
    }

    // Calculate immediately if image is already loaded
    if (img.complete) {
      calculateWrappedLines()
    }

    // Also calculate when image loads
    img.onload = calculateWrappedLines
  }, [overlayText, fontSize, selectedImage])

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
    ctx.fillStyle = '#FFFFFF'
    const calculatedFontSize = Math.floor(canvas.height * parseInt(fontSize) / 400)
    ctx.font = `${calculatedFontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Calculate line height and total height
    const lineHeight = calculatedFontSize * 1.2
    const totalHeight = wrappedLines.length * lineHeight
    
    // Draw each line
    const startY = (canvas.height - totalHeight) / 2
    wrappedLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight) + lineHeight / 2)
    })

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

              <div className="grid grid-cols-1 gap-4 mb-4">
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
              </div>

              <div className="relative w-full aspect-video" ref={imageContainerRef}>
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div
                    style={{
                      maxWidth: '80%',
                      width: '80%',
                      textAlign: 'center',
                    }}
                  >
                    {wrappedLines.map((line, index) => (
                      <div
                        key={index}
                        style={{
                          fontSize: `${fontSize}px`,
                          color: '#FFFFFF',
                          lineHeight: '1.2',
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
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
