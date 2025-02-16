import { useRef, useEffect, useCallback } from "react";

interface ImagePreviewProps {
  selectedImage: string;
  overlayText: string;
  fontSize: string;
  overlayOpacity: string;
  selectedFont: string;
  wrappedLines: string[];
  onWrappedLinesChange: (lines: string[]) => void;
  svgContent: string | null;
  svgSize: string;
}

export function ImagePreview({
  selectedImage,
  overlayText,
  fontSize,
  overlayOpacity,
  selectedFont,
  wrappedLines,
  onWrappedLinesChange,
  svgContent,
  svgSize,
}: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const wrapText = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
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
    },
    []
  );

  // Effect for loading the image
  useEffect(() => {
    const img = new Image();
    imageRef.current = img;
    img.src = selectedImage;

    const handleLoad = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      // Calculate wrapped lines after image is loaded and canvas is sized
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const calculatedFontSize = Math.floor(
        (canvasRef.current.height * parseInt(fontSize)) / 400
      );
      ctx.font = `${calculatedFontSize}px ${selectedFont}`;

      const maxWidth = canvasRef.current.width * 0.8;
      const lines = wrapText(ctx, overlayText, maxWidth);
      onWrappedLinesChange(lines);

      // Trigger initial render
      renderCanvas();
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }

    return () => {
      img.onload = null;
      imageRef.current = null;
    };
  }, [
    selectedImage,
    fontSize,
    selectedFont,
    overlayText,
    wrapText,
    onWrappedLinesChange,
  ]);

  // Effect for rendering the canvas
  const renderCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

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

    // Draw SVG if present
    if (svgContent) {
      const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const svgImg = new Image();

      await new Promise((resolve) => {
        svgImg.onload = resolve;
        svgImg.src = svgUrl;
      });

      // Calculate SVG dimensions and position while maintaining aspect ratio
      const maxWidth = canvas.width * (parseInt(svgSize) / 100); // Convert percentage to decimal
      const maxHeight = canvas.height * (parseInt(svgSize) / 100);

      // Calculate scale to fit within bounds while maintaining aspect ratio
      const scale = Math.min(
        maxWidth / svgImg.width,
        maxHeight / svgImg.height
      );

      const svgWidth = svgImg.width * scale;
      const svgHeight = svgImg.height * scale;
      const svgX = (canvas.width - svgWidth) / 2;
      const svgY = canvas.height * 0.25 - svgHeight / 2; // 25% from top

      ctx.drawImage(svgImg, svgX, svgY, svgWidth, svgHeight);
      URL.revokeObjectURL(svgUrl);
    }

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

    // Draw each line (adjusted position if SVG is present)
    const startY = svgContent
      ? (canvas.height - totalHeight) / 2 + canvas.height * 0.1 // Move text down when SVG is present
      : (canvas.height - totalHeight) / 2;

    wrappedLines.forEach((line, index) => {
      ctx.fillText(
        line,
        canvas.width / 2,
        startY + index * lineHeight + lineHeight / 2
      );
    });
  }, [
    selectedFont,
    fontSize,
    overlayOpacity,
    wrappedLines,
    svgContent,
    svgSize,
  ]);

  // Effect to trigger re-render when dependencies change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    // Create download link
    const fileFormat = "webp";
    const link = document.createElement("a");
    link.download =
      overlayText.trim() !== ""
        ? overlayText.trim().replace(/[^a-zA-Z0-9]/g, "-") + `.${fileFormat}`
        : `edited-image.${fileFormat}`;
    link.href = canvasRef.current.toDataURL(`image/${fileFormat}`);
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
