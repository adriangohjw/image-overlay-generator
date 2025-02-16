import { useRef, useEffect, useCallback } from "react";
import { useApp } from "../context/AppContext";

export function ImagePreview() {
  const {
    selectedImage,
    overlayText,
    fontSize,
    overlayOpacity,
    selectedFont,
    wrappedLines,
    setWrappedLines,
    svgContent,
    svgSize,
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const wrapText = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
      if (!text.trim()) return [];

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

      // Add text style configuration
      ctx.fillStyle = "#FFFFFF";
      const calculatedFontSize = Math.floor(
        (canvas.height * parseInt(fontSize)) / 400
      );
      ctx.font = `${calculatedFontSize}px ${selectedFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Calculate text dimensions
      const lineHeight = calculatedFontSize * 1.2;
      const totalTextHeight = wrappedLines.length * lineHeight;

      // Calculate dynamic positions with gap
      const gap = calculatedFontSize * 1.5; // Dynamic gap based on font size
      let verticalStartPosition;

      if (overlayText.trim()) {
        // If there's text, position SVG with gap for text
        const combinedHeight = svgHeight + gap + totalTextHeight;
        verticalStartPosition = (canvas.height - combinedHeight) / 2;
      } else {
        // If no text, center the SVG vertically
        verticalStartPosition = (canvas.height - svgHeight) / 2;
      }

      // Draw SVG at calculated position
      ctx.drawImage(svgImg, svgX, verticalStartPosition, svgWidth, svgHeight);
      URL.revokeObjectURL(svgUrl);

      // Draw text below SVG with gap
      if (overlayText.trim()) {
        wrappedLines.forEach((line, index) => {
          const textY =
            verticalStartPosition +
            svgHeight +
            gap +
            index * lineHeight +
            lineHeight / 2;
          ctx.fillText(line, canvas.width / 2, textY);
        });
      }
    } else {
      // Add text style configuration
      ctx.fillStyle = "#FFFFFF";
      const calculatedFontSize = Math.floor(
        (canvas.height * parseInt(fontSize)) / 400
      );
      ctx.font = `${calculatedFontSize}px ${selectedFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Calculate text position when no SVG
      const lineHeight = calculatedFontSize * 1.2;
      const totalHeight = wrappedLines.length * lineHeight;
      const verticalStartPosition = (canvas.height - totalHeight) / 2;

      // Draw centered text when no SVG
      if (overlayText.trim()) {
        wrappedLines.forEach((line, index) => {
          const textY =
            verticalStartPosition + index * lineHeight + lineHeight / 2;
          ctx.fillText(line, canvas.width / 2, textY);
        });
      }
    }
  }, [
    selectedFont,
    fontSize,
    overlayOpacity,
    wrappedLines,
    svgContent,
    svgSize,
    overlayText,
  ]);

  // Effect for loading the image
  useEffect(() => {
    if (!selectedImage) return;

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
      const lines = overlayText.trim()
        ? wrapText(ctx, overlayText, maxWidth)
        : [];
      setWrappedLines(lines);

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
    setWrappedLines,
    overlayOpacity,
    svgContent,
    svgSize,
    renderCanvas,
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
        {selectedImage ? (
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">No image selected</p>
          </div>
        )}
      </div>
      {selectedImage && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Download Image
          </button>
        </div>
      )}
    </>
  );
}
