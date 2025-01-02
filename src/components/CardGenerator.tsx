import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import CardHeader from "./card/CardHeader";
import CardGeneratorContent from "./card/CardGeneratorContent";
import CardPreviewSection from "./card/CardPreviewSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { CardDelivery } from "./card/CardDelivery";
import { CardDeliveryTracker } from "./card/CardDeliveryTracker";
import { trackEvent } from "@/utils/analytics";
import type { CardData } from "@/types/card";

const CardGenerator = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardData, setCardData] = useState<CardData>({
    recipientName: "",
    occasion: "birthday",
    message: "",
    style: "modern",
    deliveryMethod: "email",
    recipientEmail: "",
    textPosition: "center",
    fontSize: 24,
    fontFamily: "Inter"
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isPremium] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to create cards");
        navigate("/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let completed = 0;
    if (cardData.recipientName) completed++;
    if (cardData.message) completed++;
    if (cardData.style !== "modern") completed++;
    if (selectedImage) completed++;
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to create cards");
        navigate("/signin");
        return;
      }

      if (!selectedImage) {
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { 
            prompt: `${cardData.occasion} card with message: ${cardData.message}`,
            apiUrl: `${window.location.origin}/api/generate-image`
          }
        });

        if (error) throw error;
        if (data?.image) {
          setSelectedImage(data.image);
        }
      }

      // Save card and track analytics
      const { data: cardRecord, error: saveError } = await supabase
        .from('card_deliveries')
        .insert([
          {
            recipient_email: cardData.recipientEmail,
            card_image: selectedImage,
            message: cardData.message,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (saveError) throw saveError;

      await trackEvent("card_created", cardRecord.id, {
        occasion: cardData.occasion,
        style: cardData.style
      });

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

        <div className="space-y-6">
          <div className="lg:sticky lg:top-6">
            <CardPreviewSection
              selectedImage={selectedImage}
              cardMessage={cardData.message}
              isSoundEnabled={isSoundEnabled}
              isGenerating={isGenerating}
              cardStyle={cardData.style}
              textPosition={cardData.textPosition}
              fontSize={cardData.fontSize}
              fontFamily={cardData.fontFamily}
            />
            
            {selectedImage && !isGenerating && (
              <Card className="mt-4 p-4">
                <CardDelivery
                  cardRef={cardRef}
                  recipientEmail={cardData.recipientEmail}
                  message={cardData.message}
                />
              </Card>
            )}
          </div>

          <CardDeliveryTracker />
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;