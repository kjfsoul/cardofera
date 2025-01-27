import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ImageGenerationSectionProps {
  generatedImages: string[];
  selectedImageIndex: number | null;
  handleImageSelect: (index: number) => void;
  handleGenerate: () => Promise<void>;
  isGenerating: boolean;
  progress: number;
  generationError: string | null;
}

const ImageGenerationSection = ({
  generatedImages,
  selectedImageIndex,
  handleImageSelect,
  handleGenerate,
  isGenerating,
  progress,
  generationError,
}: ImageGenerationSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Generate Your Image</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={cn(
                  "relative w-full aspect-square bg-muted rounded-lg mb-2 overflow-hidden transition-all duration-200",
                  selectedImageIndex === index && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {generatedImages[index] ? (
                  <img
                    src={generatedImages[index]}
                    alt={`Generated option ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    {isGenerating ? (
                      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    ) : (
                      <span className="text-muted-foreground">Option {index + 1}</span>
                    )}
                  </div>
                )}
              </div>
              <Button
                variant={selectedImageIndex === index ? "default" : "outline"}
                className="w-full"
                onClick={() => handleImageSelect(index)}
                disabled={!generatedImages[index]}
              >
                {generatedImages[index] ? "Select" : `Option ${index + 1}`}
              </Button>
            </div>
          ))}
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Generating your images... {progress}%
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            className="flex-1 h-12 text-lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Options
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="h-12"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Retry
          </Button>
        </div>

        {generationError && (
          <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
            {generationError}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageGenerationSection;