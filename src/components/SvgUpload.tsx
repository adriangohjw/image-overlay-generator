import { FileUpload } from "./FileUpload";

interface SvgUploadProps {
  onSvgUpload: (svgContent: string | null) => void;
  svgContent: string | null;
}

export function SvgUpload({ onSvgUpload, svgContent }: SvgUploadProps) {
  const handleSvgUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const svgContent = e.target.result as string;
        // Convert SVG to white
        const whiteSvg = svgContent
          .replace(/fill="[^"]*"/g, 'fill="white"')
          .replace(/stroke="[^"]*"/g, 'stroke="white"');
        onSvgUpload(whiteSvg);
      }
    };
    reader.readAsText(file);
  };

  const handleRemoveSvg = () => {
    onSvgUpload(null);
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
