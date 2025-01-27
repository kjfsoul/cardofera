import { useState } from "react";
import { CardGeneratorProps } from "@/types/card";
import CardImageSection from "./CardImageSection";
import CardDetailsSection from "./generator/CardDetailsSection";
import ImageGenerationSection from "./generator/ImageGenerationSection";
import StyleCustomizationSection from "./generator/StyleCustomizationSection";
import DeliverySection from "./generator/DeliverySection";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { toast } from "sonner";
import TextureManager from "./TextureManager";

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
  const [selectedTexture, setSelectedTexture] = useState<string | undefined>(
    undefined,
  );

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

  const handleTextureSelect = (textureUrl: string) => {
    setSelectedTexture(textureUrl === "none" ? undefined : textureUrl);
    setCardData({
      ...cardData,
      texture: textureUrl === "none" ? undefined : textureUrl,
    });
  };

  const handleReset = () => {
    setCardData({
      ...cardData,
      message: "",
      style: "modern",
      textPosition: "center",
      fontSize: 16,
      fontFamily: "Inter",
      texture: undefined,
    });
    setSelectedImage(undefined);
    setSelectedTexture(undefined);
    setGeneratedImages([]);
    setSelectedImageIndex(null);
    toast.success("All card settings have been reset");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Your Card</h1>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <Eraser className="h-4 w-4" />
          Reset All
        </Button>
      </div>

      <CardDetailsSection
        cardData={cardData}
        setCardData={setCardData}
        isGenerating={isGenerating}
        handleGenerate={handleGenerate}
      />

      <TextureManager onTextureSelect={handleTextureSelect} />

      <CardImageSection
        showImageSearch={showImageSearch}
        setShowImageSearch={setShowImageSearch}
        setSelectedImages={handleGeneratedImages}
        isGenerating={isGenerating}
      />

      <ImageGenerationSection
        generatedImages={generatedImages}
        selectedImageIndex={selectedImageIndex}
        handleImageSelect={handleImageSelect}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        progress={progress}
        generationError={generationError}
      />

      <StyleCustomizationSection
        cardData={cardData}
        setCardData={setCardData}
      />

      <DeliverySection
        cardData={cardData}
        setCardData={setCardData}
        isPremium={isPremium}
      />
    </div>
  );
};

export default CardGeneratorContent;