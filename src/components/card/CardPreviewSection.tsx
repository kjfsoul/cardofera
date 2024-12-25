import { Card } from "@/components/ui/card";
import CardPreview3D from "./CardPreview3D";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export interface CardPreviewSectionProps {
  selectedImage: string | null;
  cardMessage: string;
  isSoundEnabled: boolean;
  isGenerating: boolean;
}

const CardPreviewSection = ({
  selectedImage,
  cardMessage,
  isSoundEnabled,
  isGenerating,
}: CardPreviewSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="aspect-[4/3]">
          <CardPreview3D
            imageUrl={selectedImage || "/placeholder.svg"}
            text={cardMessage}
            enableSound={isSoundEnabled}
          />
        </div>
      </div>

      {selectedImage && (
        <Card className="p-4 bg-muted/50">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={selectedImage}
              alt="Generated card preview"
              className="object-cover w-full h-full"
            />
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="default"
          className="w-full flex items-center justify-center gap-2"
          disabled={isGenerating}
          onClick={() => {
            // Download functionality will be implemented
            console.log("Downloading...");
          }}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          disabled={isGenerating}
          onClick={() => {
            // Share functionality will be implemented
            console.log("Sharing...");
          }}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {!selectedImage && (
        <div className="text-center text-muted-foreground text-sm">
          Your card preview will appear here once you've selected or generated an image
        </div>
      )}
    </div>
  );
};

export default CardPreviewSection;