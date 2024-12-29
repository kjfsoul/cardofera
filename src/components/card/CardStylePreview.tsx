import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardStylePreviewProps {
  style: string;
  selected: boolean;
  onSelect: (style: string) => void;
}

const styles = {
  modern: {
    className: "bg-white border-gray-200",
    preview: "Clean, minimal design with modern typography",
    textStyle: "font-sans",
  },
  classic: {
    className: "bg-cream border-amber-200",
    preview: "Traditional birthday elements and warm colors",
    textStyle: "font-serif",
  },
  playful: {
    className: "bg-gradient-to-br from-pink-100 to-blue-100 border-pink-200",
    preview: "Fun, animated elements with bright colors",
    textStyle: "font-comic",
  },
  elegant: {
    className: "bg-gray-50 border-gray-300",
    preview: "Sophisticated design with refined details",
    textStyle: "font-playfair",
  },
};

const CardStylePreview = ({ style, selected, onSelect }: CardStylePreviewProps) => {
  const styleConfig = styles[style as keyof typeof styles];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "p-4 cursor-pointer transition-all duration-200",
          styleConfig.className,
          selected && "ring-2 ring-primary ring-offset-2"
        )}
        onClick={() => onSelect(style)}
      >
        <div className="aspect-video rounded-md bg-white/80 backdrop-blur-sm p-3">
          <h3 className={cn("text-lg font-medium capitalize", styleConfig.textStyle)}>
            {style}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {styleConfig.preview}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default CardStylePreview;