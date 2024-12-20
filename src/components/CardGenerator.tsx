import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import CardImageSearch from "./card/CardImageSearch";
import CardForm from "./card/CardForm";
import CardStyleSelector from "./card/CardStyleSelector";
import DeliverySelector from "./card/DeliverySelector";
import CardImagePrompt from "./card/CardImagePrompt";
import SponsoredGame from "./card/SponsoredGame";
import CardActions from "./card/CardActions";
import CardPreviewSection from "./card/CardPreviewSection";
import PremiumFeatures from "./card/PremiumFeatures";

const DEFAULT_PREVIEW_IMAGE = "/placeholder.svg";
const SAMPLE_CARD_IMAGES = [
  "/placeholder.svg",
  // Add more sample images here
];

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
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [isPremium] = useState(false);
  const [showSponsoredGame, setShowSponsoredGame] = useState(false);
  const [currentSampleImage, setCurrentSampleImage] = useState(0);

  useEffect(() => {
    if (!selectedImage) {
      const interval = setInterval(() => {
        setCurrentSampleImage((prev) => (prev + 1) % SAMPLE_CARD_IMAGES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedImage]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGameWin = () => {
    setShowSponsoredGame(false);
    toast.success("Your discount has been applied!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <CardForm
          cardData={cardData}
          setCardData={setCardData}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
        />

        <CardStyleSelector
          selectedStyle={cardData.style}
          onStyleSelect={(style) => setCardData({ ...cardData, style })}
        />

        <DeliverySelector
          selectedMethod={cardData.deliveryMethod}
          onMethodSelect={(method) =>
            setCardData({ ...cardData, deliveryMethod: method })
          }
          isPremium={isPremium}
        />

        <CardActions
          showImageSearch={showImageSearch}
          setShowImageSearch={setShowImageSearch}
          isSoundEnabled={isSoundEnabled}
          setIsSoundEnabled={setIsSoundEnabled}
          handleImageUpload={handleImageUpload}
          setShowSponsoredGame={setShowSponsoredGame}
          showSponsoredGame={showSponsoredGame}
        />

        {showImageSearch && (
          <CardImageSearch onImageSelect={(url) => setSelectedImage(url)} />
        )}

        {showSponsoredGame && <SponsoredGame onWin={handleGameWin} />}

        <CardImagePrompt
          onImageGenerate={setSelectedImage}
          isGenerating={isGenerating}
        />

        <Button
          onClick={handleGenerate}
          className="w-full"
          disabled={isGenerating}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Card"}
        </Button>

        <PremiumFeatures isPremium={isPremium} />
      </div>

      <CardPreviewSection
        selectedImage={selectedImage}
        currentSampleImage={currentSampleImage}
        sampleImages={SAMPLE_CARD_IMAGES}
        cardMessage={cardData.message}
        isSoundEnabled={isSoundEnabled}
      />
    </div>
  );
};

export default CardGenerator;
