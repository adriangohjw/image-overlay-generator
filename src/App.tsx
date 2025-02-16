import { ImagePreview } from "./components/ImagePreview";
import { FeaturesShowcase } from "./components/FeaturesShowcase";
import { Footer } from "./components/Footer";
import { ConfigurationSteps } from "./components/ConfigurationSteps";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4 md:mb-8">
            Image Text Generator
          </h1>

          <FeaturesShowcase />

          <div className="bg-white rounded-lg shadow-lg p-5 md:p-6">
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <div className="flex flex-col gap-4 w-full md:w-1/3">
                <ConfigurationSteps />
              </div>

              <div className="w-full md:w-2/3">
                <ImagePreview />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
