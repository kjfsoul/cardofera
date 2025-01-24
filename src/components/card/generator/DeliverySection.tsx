import React from 'react';
import { Card } from "@/components/ui/card";
import DeliverySelector from "../DeliverySelector";
import PremiumFeatures from "../PremiumFeatures";
import { CardData } from "@/types/card";

interface DeliverySectionProps {
  cardData: CardData;
  setCardData: (data: CardData) => void;
  isPremium: boolean;
}

const DeliverySection = ({
  cardData,
  setCardData,
  isPremium,
}: DeliverySectionProps) => {
  return (
    <>
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
    </>
  );
};

export default DeliverySection;