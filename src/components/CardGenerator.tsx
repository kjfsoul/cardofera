import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Wand2, Download, Share2, Volume2, VolumeX, Upload, Gift } from "lucide-react";
import { toast } from "sonner";
import CardPreview3D from "./card/CardPreview3D";
import CardImageSearch from "./card/CardImageSearch";
import CardForm from "./card/CardForm";
import CardStyleSelector from "./card/CardStyleSelector";
import DeliverySelector from "./card/DeliverySelector";

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
  const [imagePrompt, setImagePrompt] = useState("");

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

  const handleReset = () => {
    setCardData({
      recipientName: "",
      occasion: "birthday",
      message: "",
      style: "modern",
      deliveryMethod: "email",
    });
    setSelectedImage(null);
    setShowImageSearch(false);
    setImagePrompt("");
    toast.success("All fields have been reset");
  };

  const handleAutoSuggest = async () => {
    if (!cardData.recipientName) {
      toast.error("Please enter recipient's name first");
      return;
    }

    setIsGenerating(true);
    try {
      const suggestedMessage = `Dear ${cardData.recipientName},\n\nWishing you a wonderful ${cardData.occasion} filled with joy and laughter! May this special day bring you everything you desire.\n\nBest wishes`;
      setCardData({ ...cardData, message: suggestedMessage });
      toast.success("Message suggested based on recipient preferences");
    } catch (error) {
      toast.error("Failed to generate suggestion");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeliveryMethod = (method: string) => {
    if (!isPremium && method !== "email") {
      toast.error("Premium subscription required for additional delivery methods");
      return;
    }
    setCardData({ ...cardData, deliveryMethod: method });
    toast.success(`Delivery method set to ${method}`);
  };

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
    setShowImageSearch(false);
    toast.success("Image selected successfully!");
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

  const handleImagePrompt = async () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }
    setIsGenerating(true);
    try {
      // Simulate AI image generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSelectedImage(DEFAULT_PREVIEW_IMAGE);
      toast.success("Image generated from prompt!");
    } catch (error) {
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    toast.success(isSoundEnabled ? "Sound disabled" : "Sound enabled");
  };

  const toggleSponsoredGame = () => {
    setShowSponsoredGame(!showSponsoredGame);
    if (!showSponsoredGame) {
      toast.success("Play games to win discounts on premium features!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <CardForm
          cardData={cardData}
          setCardData={setCardData}
          handleAutoSuggest={handleAutoSuggest}
          handleReset={handleReset}
          isGenerating={isGenerating}
        />

        <CardStyleSelector
          selectedStyle={cardData.style}
          onStyleSelect={(style) => setCardData({ ...cardData, style })}
        />

        <DeliverySelector
          selectedMethod={cardData.deliveryMethod}
          onMethodSelect={handleDeliveryMethod}
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
            <Button variant="outline" onClick={toggleSound} className="flex-1">
              {isSoundEnabled ? (
                <Volume2 className="mr-2 h-4 w-4" />
              ) : (
                <VolumeX className="mr-2 h-4 w-4" />
              )}
              {isSoundEnabled ? "Disable Sound" : "Enable Sound"}
            </Button>
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
              onClick={toggleSponsoredGame}
              className="flex-1"
            >
              <Gift className="mr-2 h-4 w-4" />
              Win Prizes
            </Button>
          </div>
        </div>

        {showImageSearch && <CardImageSearch onImageSelect={handleImageSelect} />}

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