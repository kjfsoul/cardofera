import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw } from "lucide-react";

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
  const handleRetry = async () => {
    await handleGenerate();
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Generate Your Image</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-2">
                {generatedImages[index] && (
                  <img
                    src={generatedImages[index]}
                    alt={`Generated option ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
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

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            className="flex-1 h-12 text-lg"
            disabled={isGenerating || progress < 100}
          >
            <Wand2 className="mr-2 h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate Options"}
          </Button>
          <Button variant="secondary" className="h-12" onClick={handleRetry}>
            <RefreshCw className="mr-2 h-5 w-5" />
            Retry
          </Button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">AI Generation Tips</h3>
          <ul className="text-sm space-y-1">
            <li>• Be specific about colors and themes</li>
            <li>• Mention any special occasions</li>
            <li>• Include preferred art styles</li>
            <li>• Specify if you want text incorporated</li>
          </ul>
        </div>

        {generationError && (
          <div className="text-red-500 text-sm">{generationError}</div>
        )}
      </div>
    </Card>
  );
};

export default ImageGenerationSection;