import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Wand2, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CardGenerator = () => {
  const [cardData, setCardData] = useState({
    recipientName: "",
    occasion: "birthday",
    message: "",
    style: "modern",
  });
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!cardData.recipientName || !cardData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI card generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedCard("/placeholder-card.png");
      toast.success("Card generated successfully!");
    } catch (error) {
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    // TODO: Implement actual download functionality
    toast.success("Download started!");
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    toast.success("Sharing options coming soon!");
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
        <div className="aspect-[4/3] rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/50">
          {generatedCard ? (
            <img
              src={generatedCard}
              alt="Generated card"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center p-4">
              <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your generated card will appear here
              </p>
            </div>
          )}
        </div>

        {generatedCard && (
          <div className="flex gap-4">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGenerator;