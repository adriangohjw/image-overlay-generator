import { useRef, useEffect, useCallback } from "react";

interface ImagePreviewProps {
  selectedImage: string;
  overlayText: string;
  fontSize: string;
  overlayOpacity: string;
  selectedFont: string;
  wrappedLines: string[];
  onWrappedLinesChange: (lines: string[]) => void;
}

export function ImagePreview({
  selectedImage,
  overlayText,
  fontSize,
  overlayOpacity,
  selectedFont,
  wrappedLines,
  onWrappedLinesChange,
}: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(`${currentLine} ${word}`).width;
      if (width < maxWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas dimensions to match the image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw the original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add semi-transparent black overlay
      ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text
      ctx.fillStyle = "#FFFFFF";
      const calculatedFontSize = Math.floor(
        (canvas.height * parseInt(fontSize)) / 400
      );
      ctx.font = `${calculatedFontSize}px ${selectedFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Calculate line height and total height
      const lineHeight = calculatedFontSize * 1.2;
      const totalHeight = wrappedLines.length * lineHeight;

      // Draw each line
      const startY = (canvas.height - totalHeight) / 2;
      wrappedLines.forEach((line, index) => {
        ctx.fillText(
          line,
          canvas.width / 2,
          startY + index * lineHeight + lineHeight / 2
        );
      });
    },
    [selectedFont, fontSize, overlayOpacity, wrappedLines]
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const img = new Image();
    img.src = selectedImage;

    const calculateWrappedLines = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const calculatedFontSize = Math.floor(
        (canvas.height * parseInt(fontSize)) / 400
      );
      ctx.font = `${calculatedFontSize}px ${selectedFont}`;

      const maxWidth = canvas.width * 0.8;
      const lines = wrapText(ctx, overlayText, maxWidth);
      onWrappedLinesChange(lines);

      renderCanvas(canvas, img);
    };

    if (img.complete) {
      calculateWrappedLines();
    }

    img.onload = calculateWrappedLines;
  }, [
    overlayText,
    fontSize,
    selectedFont,
    selectedImage,
    overlayOpacity,
    wrappedLines,
    onWrappedLinesChange,
    renderCanvas,
  ]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    // Create download link
    const link = document.createElement("a");
    link.download =
      overlayText.trim() !== ""
        ? overlayText.trim().replace(/[^a-zA-Z0-9]/g, "-") + ".png"
        : "edited-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <div className="relative w-full aspect-video">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
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
  );
}
