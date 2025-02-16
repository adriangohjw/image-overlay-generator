import { createContext, useContext, ReactNode, useState } from "react";
import { fonts } from "../constants/Fonts";

interface AppContextType {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  overlayText: string;
  setOverlayText: (text: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  wrappedLines: string[];
  setWrappedLines: (lines: string[]) => void;
  overlayOpacity: string;
  setOverlayOpacity: (opacity: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  svgContent: string | null;
  setSvgContent: (content: string | null) => void;
  svgSize: string;
  setSvgSize: (size: string) => void;
  svgTextDistance: string;
  setSvgTextDistance: (distance: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("28");
  const [wrappedLines, setWrappedLines] = useState<string[]>([]);
  const [overlayOpacity, setOverlayOpacity] = useState<string>("0.4");
  const [selectedFont, setSelectedFont] = useState<string>(fonts[0].name);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgSize, setSvgSize] = useState<string>("50");
  const [svgTextDistance, setSvgTextDistance] = useState<string>("20");

  const value = {
    selectedImage,
    setSelectedImage,
    overlayText,
    setOverlayText,
    fontSize,
    setFontSize,
    wrappedLines,
    setWrappedLines,
    overlayOpacity,
    setOverlayOpacity,
    selectedFont,
    setSelectedFont,
    svgContent,
    setSvgContent,
    svgSize,
    setSvgSize,
    svgTextDistance,
    setSvgTextDistance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
