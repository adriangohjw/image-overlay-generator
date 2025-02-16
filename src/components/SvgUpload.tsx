import { FileUpload } from "./FileUpload";
import { useApp } from "../context/AppContext";

export function SvgUpload() {
  const { svgContent, setSvgContent } = useApp();

  const handleSvgUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const svgContent = e.target.result as string;
        // Convert SVG to white
        const whiteSvg = svgContent
          .replace(/fill="[^"]*"/g, 'fill="white"')
          .replace(/stroke="[^"]*"/g, 'stroke="white"');
        setSvgContent(whiteSvg);
      }
    };
    reader.readAsText(file);
  };

  const handleRemoveSvg = () => {
    setSvgContent(null);
  };

  return (
    <FileUpload
      onFileUpload={handleSvgUpload}
      hasFile={!!svgContent}
      onRemove={handleRemoveSvg}
      accept=".svg"
      label="Upload SVG Icon"
      uploadedMessage="SVG icon uploaded!"
    />
  );
}
