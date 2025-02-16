import { FileUpload } from "./FileUpload";
import { useApp } from "../context/AppContext";

export function SvgUpload() {
  const { svgContent, setSvgContent } = useApp();

  const convertSvgToWhite = (svgContent: string): string => {
    return svgContent
      .replace(/fill="[^"]*"/g, 'fill="white"')
      .replace(/stroke="[^"]*"/g, 'stroke="white"');
  };

  const handleSvgUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const svgContent = e.target.result as string;
        setSvgContent(convertSvgToWhite(svgContent));
      }
    };
    reader.readAsText(file);
  };

  const handleRemoveSvg = () => {
    setSvgContent(null);
  };

  const handleTrySampleImage = async () => {
    try {
      const response = await fetch("/src/assets/default-svg.svg");
      const svgText = await response.text();
      setSvgContent(convertSvgToWhite(svgText));
    } catch (error) {
      console.error("Error loading sample SVG:", error);
    }
  };

  return (
    <FileUpload
      onFileUpload={handleSvgUpload}
      hasFile={!!svgContent}
      onRemove={handleRemoveSvg}
      accept=".svg"
      label="Upload SVG Icon"
      uploadedMessage="SVG icon uploaded!"
      handleTrySampleImage={handleTrySampleImage}
    />
  );
}
