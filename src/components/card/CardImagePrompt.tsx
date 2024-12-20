import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
      // Simulate AI image generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onImageGenerate("/placeholder.svg");
      toast.success("Image generated from prompt!");
    } catch (error) {
      toast.error("Failed to generate image");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Describe your card image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </Button>
    </div>
  );
};

export default CardImagePrompt;