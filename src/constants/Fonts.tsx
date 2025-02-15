interface Font {
  name: string;
  displayName: string;
  description: string;
}

export const fonts: Font[] = [
  {
    name: "Playfair Display",
    displayName: "Playfair Display",
    description: "Elegant serif",
  },
  {
    name: "Roboto",
    displayName: "Roboto",
    description: "Clean and modern",
  },
  {
    name: "Open Sans",
    displayName: "Open Sans",
    description: "Friendly and approachable",
  },
  {
    name: "Montserrat",
    displayName: "Montserrat",
    description: "Contemporary sans-serif",
  },
  {
    name: "Lato",
    displayName: "Lato",
    description: "Balanced and modern",
  },
  {
    name: "Merriweather",
    displayName: "Merriweather",
    description: "Classic serif",
  },
] as const;
