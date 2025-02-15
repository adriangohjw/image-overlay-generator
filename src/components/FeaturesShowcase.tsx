interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "🔒 100% Secure + Open Source",
    description:
      "Your images are private, processed locally in your browser. Plus, it's open source.",
  },
  {
    title: "🌟 Free to Use",
    description:
      "No hidden costs or subscriptions - create as many overlays as you need.",
  },
  {
    title: "🎨 Rich Customization",
    description:
      "Customize fonts, sizes, opacity, and text positioning to match your style.",
  },
] as const;

export function FeaturesShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col items-center justify-center gap-1 bg-white rounded-lg shadow-sm p-4 text-center"
        >
          <div className="text-sm font-medium">{feature.title}</div>
          <p className="text-gray-500 text-xs">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
