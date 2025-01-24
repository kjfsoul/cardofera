import React from 'react';
import { Card } from "@/components/ui/card";
import CardForm from "../CardForm";
import { CardData } from "@/types/card";

interface CardDetailsSectionProps {
  cardData: CardData;
  setCardData: (data: CardData) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
}

const CardDetailsSection = ({
  cardData,
  setCardData,
  isGenerating,
  handleGenerate,
}: CardDetailsSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">1. Card Details</h2>
      <CardForm
        cardData={cardData}
        setCardData={setCardData}
        isGenerating={isGenerating}
        handleGenerate={handleGenerate}
      />
    </Card>
  );
};

export default CardDetailsSection;