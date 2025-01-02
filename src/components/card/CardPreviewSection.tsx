import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import CardPreview3D from "./CardPreview3D";
import CardDownloadShare from "./CardDownloadShare";

export interface CardPreviewSectionProps {
  selectedImage: string | null;
  cardMessage: string;
  isSoundEnabled: boolean;
  isGenerating: boolean;
  cardStyle: string; // Added this prop
  textPosition: "left" | "center" | "right";
  fontSize: number;
  fontFamily: string;
}

const CardPreviewSection = ({
  selectedImage,
  cardMessage,
  isSoundEnabled,
  isGenerating,
  cardStyle,
  textPosition,
  fontSize,
  fontFamily,
}: CardPreviewSectionProps) => {
  const getTextAlignment = () => {
    switch (textPosition) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  const getStyleClasses = () => {
    switch (cardStyle) {
      case "modern":
        return "bg-white";
      case "classic":
        return "bg-cream";
      case "playful":
        return "bg-gradient-to-br from-pink-100 to-blue-100";
      case "elegant":
        return "bg-gray-50";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="aspect-[4/3]">
          <CardPreview3D
            imageUrl={selectedImage || "/placeholder.svg"}
            text={cardMessage}
            enableSound={isSoundEnabled}
            style={cardStyle}
          />
        </div>
      </div>

      {selectedImage && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={`p-4 ${getStyleClasses()}`}>
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                <img
                  src={selectedImage}
                  alt="Generated card preview"
                  className="object-cover w-full h-full"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm ${getTextAlignment()}`}
                >
                  <div
                    className="text-white"
                    style={{
                      fontFamily,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {cardMessage || "Your message will appear here..."}
                  </div>
                </div>
              </div>
              <CardDownloadShare
                imageUrl={selectedImage}
                isGenerating={isGenerating}
              />
            </Card>
          </motion.div>
        </AnimatePresence>
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