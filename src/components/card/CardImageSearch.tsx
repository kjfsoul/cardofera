import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CardImageSearchProps {
  onImageSelect: (url: string) => void;
}

const CardImageSearch = ({ onImageSelect }: CardImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAIImage = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a description for the image");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: searchQuery }
      });

      if (error) throw error;

      if (data.image) {
        onImageSelect(data.image);
        toast.success("AI image generated successfully!");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Describe the image you want (e.g., birthday cake with candles)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleGenerateAIImage()}
        />
        <Button onClick={handleGenerateAIImage} disabled={isGenerating}>
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>

      {isGenerating && (
        <div className="text-center text-muted-foreground animate-pulse">
          Creating your custom card image... This may take a few moments.
        </div>
      )}
    </div>
  );
};

export default CardImageSearch;