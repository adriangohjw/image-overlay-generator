import { useState } from 'react'
import { ImageUpload } from './components/ImageUpload'
import { TextControls } from './components/TextControls'
import { ImagePreview } from './components/ImagePreview'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [overlayText, setOverlayText] = useState('')
  const [fontSize, setFontSize] = useState('24')
  const [wrappedLines, setWrappedLines] = useState<string[]>([])
  const [overlayOpacity, setOverlayOpacity] = useState('0.4')

  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.src = selectedImage as string

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Draw the original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Add semi-transparent black overlay
      ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`
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
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Image Text Overlay Generator</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <ImageUpload onImageUpload={setSelectedImage} />

          {selectedImage && (
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="w-full md:w-1/3">
                <TextControls
                  overlayText={overlayText}
                  fontSize={fontSize}
                  overlayOpacity={overlayOpacity}
                  onTextChange={setOverlayText}
                  onFontSizeChange={setFontSize}
                  onOpacityChange={setOverlayOpacity}
                />
              </div>

              <div className="w-full md:w-2/3">
                <ImagePreview
                  selectedImage={selectedImage}
                  overlayText={overlayText}
                  fontSize={fontSize}
                  overlayOpacity={overlayOpacity}
                  wrappedLines={wrappedLines}
                  onWrappedLinesChange={setWrappedLines}
                  onDownload={handleDownload}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
