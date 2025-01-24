import { useState } from "react";
import { CardGeneratorProps } from "@/types/card";
import CardImageSection from "./CardImageSection";
import CardDetailsSection from "./generator/CardDetailsSection";
import ImageGenerationSection from "./generator/ImageGenerationSection";
import StyleCustomizationSection from "./generator/StyleCustomizationSection";
import DeliverySection from "./generator/DeliverySection";

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

  return (
    <div className="space-y-6">
      <CardDetailsSection
        cardData={cardData}
        setCardData={setCardData}
        isGenerating={isGenerating}
        handleGenerate={handleGenerate}
      />

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