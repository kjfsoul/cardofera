import { useState, useEffect } from "react";
import { toast } from "sonner";
import CardHeader from "./card/CardHeader";
import CardGeneratorContent from "./card/CardGeneratorContent";
import CardPreviewSection from "./card/CardPreviewSection";

const CardGenerator = () => {
  const [cardData, setCardData] = useState({
    recipientName: "",
    occasion: "birthday",
    message: "",
    style: "modern",
    deliveryMethod: "email",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isPremium] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let completed = 0;
    if (cardData.recipientName) completed++;
    if (cardData.message) completed++;
    if (selectedImage) completed++;
    if (cardData.style !== "modern") completed++;
    setProgress((completed / 4) * 100);
  }, [cardData, selectedImage]);

  const handleGenerate = async () => {
    if (!cardData.recipientName || !cardData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Card generated successfully!");
    } catch (error) {
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CardHeader progress={progress} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CardGeneratorContent
          cardData={cardData}
          setCardData={setCardData}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
          progress={progress}
          isPremium={isPremium}
        />

        <div className="lg:sticky lg:top-6">
          <CardPreviewSection
            selectedImage={selectedImage}
            cardMessage={cardData.message}
            isSoundEnabled={isSoundEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;