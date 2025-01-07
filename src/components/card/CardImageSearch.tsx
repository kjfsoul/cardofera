import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CardImageSearchProps {
  onImageSelect: (urls: string[]) => void;
}

const CardImageSearch = ({ onImageSelect }: CardImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerateAIImage = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a description for the image");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: searchQuery,
          num_images: 3 // Request 3 images
        }
      });

      if (error) throw error;

      if (data.images && Array.isArray(data.images)) {
        setGeneratedImages(data.images);
        onImageSelect(data.images);
        toast.success("AI images generated successfully!");
      }
    } catch (error) {
      console.error('Error generating images:', error);
      toast.error("Failed to generate images. Please try again.");
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
          Creating your custom card images... This may take a few moments.
        </div>
      )}

      {generatedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {generatedImages.map((imageUrl, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={imageUrl}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                onClick={() => onImageSelect([imageUrl])}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardImageSearch;