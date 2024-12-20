import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Wand2, Download, Share2, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import CardPreview3D from "./card/CardPreview3D";
import CardImageSearch from "./card/CardImageSearch";

const CardGenerator = () => {
  const [cardData, setCardData] = useState({
    recipientName: "",
    occasion: "birthday",
    message: "",
    style: "modern",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);

  const handleGenerate = async () => {
    if (!cardData.recipientName || !cardData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI card generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Card generated successfully!");
    } catch (error) {
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
    setShowImageSearch(false);
    toast.success("Image selected successfully!");
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    toast.success(isSoundEnabled ? "Sound disabled" : "Sound enabled");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Recipient's Name</Label>
          <Input
            id="recipientName"
            value={cardData.recipientName}
            onChange={(e) =>
              setCardData({ ...cardData, recipientName: e.target.value })
            }
            placeholder="Enter recipient's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occasion">Occasion</Label>
          <select
            id="occasion"
            value={cardData.occasion}
            onChange={(e) =>
              setCardData({ ...cardData, occasion: e.target.value })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="congratulations">Congratulations</option>
            <option value="thank-you">Thank You</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={cardData.message}
            onChange={(e) => setCardData({ ...cardData, message: e.target.value })}
            placeholder="Enter your message"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Card Style</Label>
          <div className="grid grid-cols-2 gap-4">
            {["modern", "classic", "playful", "elegant"].map((style) => (
              <button
                key={style}
                onClick={() => setCardData({ ...cardData, style })}
                className={cn(
                  "p-4 rounded-lg border text-center capitalize transition-colors",
                  cardData.style === style
                    ? "border-primary bg-primary/10"
                    : "border-input hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowImageSearch(!showImageSearch)}
            className="flex-1"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            {showImageSearch ? "Hide Image Search" : "Search Images"}
          </Button>
          <Button
            variant="outline"
            onClick={toggleSound}
            className="flex-1"
          >
            {isSoundEnabled ? (
              <Volume2 className="mr-2 h-4 w-4" />
            ) : (
              <VolumeX className="mr-2 h-4 w-4" />
            )}
            {isSoundEnabled ? "Disable Sound" : "Enable Sound"}
          </Button>
        </div>

        {showImageSearch && (
          <CardImageSearch onImageSelect={handleImageSelect} />
        )}

        <Button
          onClick={handleGenerate}
          className="w-full"
          disabled={isGenerating}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Card"}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {selectedImage ? (
          <CardPreview3D imageUrl={selectedImage} text={cardData.message} />
        ) : (
          <div className="aspect-[4/3] rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/50">
            <div className="text-center p-4">
              <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Search and select an image to preview your card in 3D
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={() => toast.success("Download started!")} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={() => toast.success("Sharing options coming soon!")} variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;