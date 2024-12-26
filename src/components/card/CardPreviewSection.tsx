import { Card } from "@/components/ui/card";
import CardPreview3D from "./CardPreview3D";
import CardDownloadShare from "./CardDownloadShare";

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
          <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
            <img
              src={selectedImage}
              alt="Generated card preview"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {cardMessage}
          </div>
          <CardDownloadShare
            imageUrl={selectedImage}
            isGenerating={isGenerating}
          />
        </Card>
      )}

      {!selectedImage && (
        <div className="text-center text-muted-foreground text-sm">
          Your card preview will appear here once you've selected or generated an
          image
        </div>
      )}
    </div>
  );
};

export default CardPreviewSection;