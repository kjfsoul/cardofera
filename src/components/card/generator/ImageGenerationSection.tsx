import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const promptTips = [
    {
      category: "Themes",
      tips: [
        "Birthday celebration with confetti and balloons",
        "Romantic sunset beach scene",
        "Winter wonderland with snowflakes",
      ],
    },
    {
      category: "Art Styles",
      tips: [
        "Watercolor painting style",
        "Modern minimalist design",
        "Vintage hand-drawn illustration",
      ],
    },
    {
      category: "Occasions",
      tips: [
        "Wedding anniversary with flowers",
        "Graduation ceremony with cap and diploma",
        "New baby announcement with soft pastels",
      ],
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Generate Your Image</h2>
      <div className="space-y-6">
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="prompt-guide">
            <AccordionTrigger className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Prompt Guide
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                {promptTips.map((section) => (
                  <div key={section.category}>
                    <h4 className="font-medium mb-2">{section.category}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {section.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-muted rounded-lg mb-2 overflow-hidden">
                {generatedImages[index] && (
                  <img
                    src={generatedImages[index]}
                    alt={`Generated option ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
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
            disabled={isGenerating}
          >
            <Wand2 className="mr-2 h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate Options"}
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