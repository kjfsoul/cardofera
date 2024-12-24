import { Card } from "@/components/ui/card";
import CardPreview3D from "./CardPreview3D";

interface CardPreviewSectionProps {
  selectedImage: string | null;
  cardMessage: string;
  isSoundEnabled: boolean;
}

const CardPreviewSection = ({
  selectedImage,
  cardMessage,
  isSoundEnabled,
}: CardPreviewSectionProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="aspect-[4/3]">
          <CardPreview3D
            imageUrl={selectedImage || "/placeholder.svg"}
            text={cardMessage}
            enableSound={isSoundEnabled}
          />
        </div>
      </Card>

      {selectedImage && (
        <Card className="p-4">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={selectedImage}
              alt="Generated card preview"
              className="object-cover w-full h-full"
            />
          </div>
        </Card>
      )}

      <div className="flex gap-4">
        <button
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
          onClick={() => {
            // Download functionality will be implemented
            console.log("Downloading...");
          }}
        >
          Download
        </button>
        <button
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg transition-colors"
          onClick={() => {
            // Share functionality will be implemented
            console.log("Sharing...");
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default CardPreviewSection;