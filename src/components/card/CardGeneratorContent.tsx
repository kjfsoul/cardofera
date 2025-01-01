import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import CardForm from "./CardForm";
import CardImageSection from "./CardImageSection";
import CardStyleSelector from "./CardStyleSelector";
import DeliverySelector from "./DeliverySelector";
import PremiumFeatures from "./PremiumFeatures";

export interface CardData {
  recipientName: string;
  occasion: string;
  message: string;
  style: string;
  deliveryMethod: string;
  recipientEmail: string;
}

export interface CardGeneratorContentProps {
  cardData: CardData;
  setCardData: (data: CardData) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
  progress: number;
  isPremium: boolean;
  generationError?: string | null;
}

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
}: CardGeneratorContentProps) => {
  const [showImageSearch, setShowImageSearch] = useState(false);

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
        setSelectedImage={setSelectedImage}
        isGenerating={isGenerating}
      />

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">3. Choose Your Style</h2>
        <CardStyleSelector
          selectedStyle={cardData.style}
          onStyleSelect={(style) => setCardData({ ...cardData, style })}
        />
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

      {generationError && (
        <div className="text-red-500 text-sm">{generationError}</div>
      )}

      <Button
        onClick={handleGenerate}
        className="w-full h-12 text-lg"
        disabled={isGenerating || progress < 100}
      >
        <Wand2 className="mr-2 h-5 w-5" />
        {isGenerating ? "Generating..." : "Generate Card"}
      </Button>

      {!isPremium && <PremiumFeatures isPremium={isPremium} />}
    </div>
  );
};

export default CardGeneratorContent;
