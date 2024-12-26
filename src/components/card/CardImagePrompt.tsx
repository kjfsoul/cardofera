import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CardImagePromptProps {
  onImageGenerate: (url: string) => void;
  isGenerating: boolean;
}

const CardImagePrompt = ({ onImageGenerate, isGenerating }: CardImagePromptProps) => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt }
      });

      if (error) throw error;
      
      if (data?.image) {
        onImageGenerate(data.image);
        toast.success("Image generated successfully!");
      } else {
        throw new Error("No image data received");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Describe your perfect card image (e.g., 'A beautiful birthday cake with colorful candles')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="h-12"
      />
      <Button 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full h-12"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        {isGenerating ? "Generating Image..." : "Generate Image with AI"}
      </Button>
    </div>
  );
};

export default CardImagePrompt;