import { Card } from "@/components/ui/card";
import CardPreview3D from "./preview/CardPreview3D";
import { cn } from "@/lib/utils";
import type { CardStyle } from "@/types/card";

interface CardPreviewSectionProps {
  selectedImage: string | undefined;
  imageUrl: string | undefined;
  cardMessage: string;
  isSoundEnabled: boolean;
  cardStyle: CardStyle;
  textPosition: "left" | "center" | "right";
  fontSize: number;
  fontFamily: string;
}

const CardPreviewSection = ({
  selectedImage,
  imageUrl,
  cardMessage,
  isSoundEnabled,
  cardStyle,
  textPosition,
  fontSize,
  fontFamily,
}: CardPreviewSectionProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Card Preview</h2>
        
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border">
          <CardPreview3D
            imageUrl={selectedImage || imageUrl}
            text={cardMessage}
            enableSound={isSoundEnabled}
            style={cardStyle}
          />
        </div>

        {cardMessage && (
          <div 
            className={cn(
              "p-4 rounded-lg bg-white/50 backdrop-blur-sm",
              textPosition === "left" && "text-left",
              textPosition === "center" && "text-center",
              textPosition === "right" && "text-right"
            )}
            style={{ 
              fontSize: `${fontSize}px`,
              fontFamily 
            }}
          >
            {cardMessage}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardPreviewSection;