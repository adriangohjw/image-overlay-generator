import { useRef, useEffect } from 'react'

interface ImagePreviewProps {
  selectedImage: string
  overlayText: string
  fontSize: string
  wrappedLines: string[]
  onWrappedLinesChange: (lines: string[]) => void
  onDownload: () => void
}

export function ImagePreview({
  selectedImage,
  overlayText,
  fontSize,
  wrappedLines,
  onWrappedLinesChange,
  onDownload,
}: ImagePreviewProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!imageContainerRef.current) return

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
      onWrappedLinesChange(lines)
    }

    if (img.complete) {
      calculateWrappedLines()
    }

    img.onload = calculateWrappedLines
  }, [overlayText, fontSize, selectedImage, onWrappedLinesChange])

  return (
    <>
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
          onClick={onDownload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Download Edited Image
        </button>
      </div>
    </>
  )
} 