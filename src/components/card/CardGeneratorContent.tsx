import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wand2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RefreshCw,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CardForm from "./CardForm";
import CardStyleSelector from "./CardStyleSelector";
import CardImageSection from "./CardImageSection";
import DeliverySelector from "./DeliverySelector";
import PremiumFeatures from "./PremiumFeatures";
import type { CardGeneratorProps } from "@/types/card";

const CardGeneratorContent = ({
  cardData,
  setCardData,
  selectedImage,
  setSelectedImage,
  isGenerating,
  handleGenerate,
  progress,
  isPremium,
  generationError,
}: CardGeneratorProps) => {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const handleRetry = async () => {
    await handleGenerate();
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    if (generatedImages[index]) {
      setSelectedImage(generatedImages[index]);
    }
  };

  const handleGeneratedImages = (images: string[]) => {
    setGeneratedImages(images);
    if (images.length > 0) {
      setSelectedImage(images[0]);
      setSelectedImageIndex(0);
    }
  };

  const fonts = [
    "Inter",
    "Playfair Display",
    "Roboto Mono",
    "Comic Sans MS",
    "Dancing Script",
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">1. Card Details</h2>
        <CardForm
          cardData={cardData}
          setCardData={setCardData}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
        />
      </Card>

      <CardImageSection
        showImageSearch={showImageSearch}
        setShowImageSearch={setShowImageSearch}
        setSelectedImages={handleGeneratedImages}
        isGenerating={isGenerating}
      />

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">2. Generate Your Image</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-2">
                  {generatedImages[index] && (
                    <img
                      src={generatedImages[index]}
                      alt={`Generated option ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <Button
                  variant={selectedImageIndex === index ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleImageSelect(index)}
                  disabled={!generatedImages[index]}
                >
                  {generatedImages[index] ? "Select" : `Option ${index + 1}`}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              className="flex-1 h-12 text-lg"
              disabled={isGenerating || progress < 100}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Options"}
            </Button>
            <Button variant="secondary" className="h-12" onClick={handleRetry}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Retry
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Generation Tips</h3>
            <ul className="text-sm space-y-1">
              <li>• Be specific about colors and themes</li>
              <li>• Mention any special occasions</li>
              <li>• Include preferred art styles</li>
              <li>• Specify if you want text incorporated</li>
            </ul>
          </div>

          {generationError && (
            <div className="text-red-500 text-sm">{generationError}</div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">3. Choose Your Style</h2>
        <CardStyleSelector
          selectedStyle={cardData.style}
          onStyleSelect={(style) => setCardData({ ...cardData, style })}
        />
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Text Position</h3>
            <div className="flex gap-2">
              <Button
                variant={
                  cardData.textPosition === "left" ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setCardData({ ...cardData, textPosition: "left" })
                }
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={
                  cardData.textPosition === "center" ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setCardData({ ...cardData, textPosition: "center" })
                }
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={
                  cardData.textPosition === "right" ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setCardData({ ...cardData, textPosition: "right" })
                }
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Font</h3>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={cardData.fontFamily}
              onChange={(e) =>
                setCardData({ ...cardData, fontFamily: e.target.value })
              }
            >
              {fonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Font Size</h3>
            <Slider
              value={[cardData.fontSize]}
              onValueChange={(value) =>
                setCardData({ ...cardData, fontSize: value[0] })
              }
              min={12}
              max={48}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {cardData.fontSize}px
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">4. Delivery Method</h2>
        <DeliverySelector
          selectedMethod={cardData.deliveryMethod}
          onMethodSelect={(method) =>
            setCardData({ ...cardData, deliveryMethod: method })
          }
          isPremium={isPremium}
        />
      </Card>

      {!isPremium && <PremiumFeatures isPremium={isPremium} />}
    </div>
  );
};

export default CardGeneratorContent;
