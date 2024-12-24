import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, ImagePlus, Upload, Volume2, Sparkles } from "lucide-react";
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
import { Card } from "@/components/ui/card";

const DEFAULT_PREVIEW_IMAGE = "/placeholder.svg";

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
        <Card className="p-6">
          <CardForm
            cardData={cardData}
            setCardData={setCardData}
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
          />
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => setShowImageSearch(!showImageSearch)}
                className="flex items-center justify-center gap-2 h-20"
              >
                <ImagePlus className="h-6 w-6" />
                <div className="text-sm">
                  <div className="font-semibold">Search Images</div>
                  <div className="text-muted-foreground">Browse our collection</div>
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="flex items-center justify-center gap-2 h-20"
              >
                <Volume2 className="h-6 w-6" />
                <div className="text-sm">
                  <div className="font-semibold">Enable Sound</div>
                  <div className="text-muted-foreground">Add audio effects</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-20"
                asChild
              >
                <label>
                  <Upload className="h-6 w-6" />
                  <div className="text-sm">
                    <div className="font-semibold">Upload Image</div>
                    <div className="text-muted-foreground">Use your own image</div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowSponsoredGame(!showSponsoredGame)}
                className="flex items-center justify-center gap-2 h-20"
              >
                <Sparkles className="h-6 w-6" />
                <div className="text-sm">
                  <div className="font-semibold">Play & Win</div>
                  <div className="text-muted-foreground">Get special offers</div>
                </div>
              </Button>
            </div>

            {showImageSearch && (
              <CardImageSearch onImageSelect={(url) => setSelectedImage(url)} />
            )}

            {showSponsoredGame && <SponsoredGame onWin={handleGameWin} />}

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">AI Image Generation</h3>
              <p className="text-sm text-muted-foreground">
                Describe your perfect card image and let our AI create it for you
              </p>
              <CardImagePrompt
                onImageGenerate={setSelectedImage}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <CardStyleSelector
            selectedStyle={cardData.style}
            onStyleSelect={(style) => setCardData({ ...cardData, style })}
          />
        </Card>

        <Card className="p-6">
          <DeliverySelector
            selectedMethod={cardData.deliveryMethod}
            onMethodSelect={(method) =>
              setCardData({ ...cardData, deliveryMethod: method })
            }
            isPremium={isPremium}
          />
        </Card>

        <Button
          onClick={handleGenerate}
          className="w-full h-12 text-lg"
          disabled={isGenerating}
        >
          <Wand2 className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating..." : "Generate Card"}
        </Button>

        <PremiumFeatures isPremium={isPremium} />
      </div>

      <div className="sticky top-6">
        <CardPreviewSection
          selectedImage={selectedImage}
          cardMessage={cardData.message}
          isSoundEnabled={isSoundEnabled}
        />
      </div>
    </div>
  );
};

export default CardGenerator;