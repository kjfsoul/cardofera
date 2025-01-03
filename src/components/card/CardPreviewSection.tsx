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
        return {
          container: "bg-white shadow-2xl rounded-xl border-2 border-gray-300 p-8",
          card: "bg-white border-2 border-gray-200",
          text: "text-gray-800"
        };
      case "classic":
        return {
          container: "bg-[#faf3e0] shadow-lg rounded-lg border-4 border-[#b68d40] p-6",
          card: "bg-[#faf3e0] border-4 border-[#b68d40]",
          text: "text-[#5a4a42]"
        };
      case "playful":
        return {
          container: "bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] shadow-2xl rounded-[2rem] border-8 border-white/50 p-10",
          card: "bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] border-8 border-white/50",
          text: "text-white"
        };
      case "elegant":
        return {
          container: "bg-[#f8f8f8] shadow-md rounded-lg border-2 border-[#d4af37] p-8",
          card: "bg-[#f8f8f8] border-2 border-[#d4af37]",
          text: "text-[#5a4a42]"
        };
      case "canva":
        return {
          container: "bg-white shadow-2xl rounded-xl border-2 border-gray-300 p-8",
          card: "bg-white border-2 border-gray-200",
          text: "text-gray-800"
        };
      default:
        return {
          container: "bg-white shadow-2xl rounded-xl border-2 border-gray-300 p-8",
          card: "bg-white border-2 border-gray-200",
          text: "text-gray-800"
        };
    }
  };

  const getTextStyle = () => {
    switch (cardStyle) {
      case "modern":
        return "font-sans font-bold";
      case "classic":
        return "font-serif italic";
      case "playful":
        return "font-comic-sans font-bold";
      case "elegant":
        return "font-cursive text-2xl";
      default:
        return "font-sans";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="aspect-[4/3]">
          <div className="relative w-full h-full">
            <CardPreview3D
              key={`${selectedImage}-${cardStyle}-${Date.now()}`} // Force complete re-render
              imageUrl={selectedImage || "/placeholder.svg"}
              text={cardMessage}
              enableSound={isSoundEnabled}
              style={cardStyle}
              onError={() => {
                // Handle 3D rendering errors
                console.error('3D rendering failed');
                // Optionally show error state
              }}
            />
            {!selectedImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="text-center text-muted-foreground">
                  Card preview will appear here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={`${getStyleClasses()} relative overflow-hidden`}>
              {/* Decorative elements */}
              {cardStyle === 'modern' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              )}
              {cardStyle === 'classic' && (
                <div className="absolute inset-0 bg-[url('/classic-pattern.svg')] opacity-20" />
              )}
              {cardStyle === 'playful' && (
                <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-30" />
              )}
              {cardStyle === 'elegant' && (
                <div className="absolute inset-0 bg-[url('/gold-flourish.svg')] opacity-15" />
              )}
              <div className="aspect-[5/7] relative overflow-hidden rounded-lg mb-4 border-2 border-gray-200">
                <img
                  src={selectedImage}
                  alt="Generated card preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm ${getTextAlignment()} card-content`}
                >
                  <div
                    className={`text-white ${getTextStyle()}`}
                    style={{
                      fontFamily,
                      fontSize: `${fontSize}px`,
                      textShadow: cardStyle === 'elegant' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
                      letterSpacing: cardStyle === 'modern' ? '0.05em' : 'normal',
                      transform: cardStyle === 'playful' ? 'rotate(-2deg)' : 'none'
                    }}
                  >
                    {cardMessage || "Your message will appear here..."}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <CardDownloadShare
                  imageUrl={selectedImage}
                  isGenerating={isGenerating}
                />
                {cardStyle === 'canva' && (
                  <a
                    href={`https://www.canva.com/design/DAF/create?embed&template=blank&content=${encodeURIComponent(selectedImage || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#00C4CC] rounded-md hover:bg-[#00a8b0] transition-colors"
                  >
                    Edit in Canva
                  </a>
                )}
              </div>
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
