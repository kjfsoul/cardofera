import { useState, useEffect } from "react";
import { toast } from "sonner";
import CardHeader from "./card/CardHeader";
import CardGeneratorContent from "./card/CardGeneratorContent";
import CardPreviewSection from "./card/CardPreviewSection";
import { supabase } from "@/integrations/supabase/client";

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
  const [generationError, setGenerationError] = useState<string | null>(null);

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
    setGenerationError(null);

    try {
      // Generate card image if none selected
      if (!selectedImage) {
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { prompt: `${cardData.occasion} card with message: ${cardData.message}` }
        });

        if (error) throw error;
        if (data.image) {
          setSelectedImage(data.image);
        }
      }

      // Save card data
      const { data: cardRecord, error: saveError } = await supabase
        .from('cards')
        .insert([
          {
            recipient_name: cardData.recipientName,
            occasion: cardData.occasion,
            message: cardData.message,
            style: cardData.style,
            delivery_method: cardData.deliveryMethod,
            image_url: selectedImage,
          }
        ])
        .select()
        .single();

      if (saveError) throw saveError;

      toast.success("Card generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationError(error.message);
      toast.error("Failed to generate card. Please try again.");
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
          generationError={generationError}
        />

        <div className="lg:sticky lg:top-6">
          <CardPreviewSection
            selectedImage={selectedImage}
            cardMessage={cardData.message}
            isSoundEnabled={isSoundEnabled}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;