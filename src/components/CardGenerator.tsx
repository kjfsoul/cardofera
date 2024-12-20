import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Wand2, Download, Share2, Upload } from "lucide-react";
import { toast } from "sonner";
import CardPreview3D from "./card/CardPreview3D";
import CardImageSearch from "./card/CardImageSearch";
import CardForm from "./card/CardForm";
import CardStyleSelector from "./card/CardStyleSelector";
import DeliverySelector from "./card/DeliverySelector";
import CardSoundToggle from "./card/CardSoundToggle";
import CardImagePrompt from "./card/CardImagePrompt";
import SponsoredGame from "./card/SponsoredGame";

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

  // Rotate sample images
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
          onMethodSelect={(method) => setCardData({ ...cardData, deliveryMethod: method })}
          isPremium={isPremium}
        />

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowImageSearch(!showImageSearch)}
              className="flex-1"
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {showImageSearch ? "Hide Image Search" : "Search Images"}
            </Button>
            <CardSoundToggle
              isSoundEnabled={isSoundEnabled}
              onToggle={() => setIsSoundEnabled(!isSoundEnabled)}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <label>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
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
              className="flex-1"
            >
              Play & Win
            </Button>
          </div>
        </div>

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

        {!isPremium && (
          <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Upgrade to Premium for advanced features:
              <ul className="list-disc list-inside mt-2">
                <li>Auto-suggested cards and gifts</li>
                <li>Week-in-advance birthday reminders</li>
                <li>Multiple delivery methods</li>
                <li>Aura-based theme generation</li>
              </ul>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <CardPreview3D
          imageUrl={selectedImage || SAMPLE_CARD_IMAGES[currentSampleImage]}
          text={cardData.message}
          enableSound={isSoundEnabled}
        />

        <div className="flex gap-4">
          <Button
            onClick={() => toast.success("Download started!")}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            onClick={() => toast.success("Sharing options coming soon!")}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;