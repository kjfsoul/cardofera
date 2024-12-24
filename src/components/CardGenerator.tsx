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
import { Progress } from "@/components/ui/progress";

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Create Your Perfect Card</h1>
        <p className="text-center text-muted-foreground mb-6">
          Design a beautiful card in minutes with our AI-powered tools
        </p>
        <div className="w-full max-w-md mx-auto mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center mt-2 text-muted-foreground">
            {progress === 100 ? "Ready to generate!" : "Complete all steps to create your card"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">2. Choose Your Image</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowImageSearch(!showImageSearch)}
                  className="flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <ImagePlus className="h-6 w-6" />
                  <div className="text-sm text-center">
                    <div className="font-semibold">Browse Images</div>
                    <div className="text-muted-foreground">Search our collection</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group"
                  asChild
                >
                  <label>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Upload className="h-6 w-6" />
                    <div className="text-sm text-center">
                      <div className="font-semibold">Upload Image</div>
                      <div className="text-muted-foreground">Use your own</div>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
              </div>

              {showImageSearch && (
                <CardImageSearch onImageSelect={(url) => setSelectedImage(url)} />
              )}

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

        <div className="lg:sticky lg:top-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
            <CardPreviewSection
              selectedImage={selectedImage}
              cardMessage={cardData.message}
              isSoundEnabled={isSoundEnabled}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;