import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MessagePreviewProps {
  message: string;
  style: string;
  maxLength?: number;
}

const MessagePreview = ({
  message,
  style,
  maxLength = 500,
}: MessagePreviewProps) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const getStyleClasses = () => {
    switch (style) {
      case "modern":
        return "font-sans";
      case "classic":
        return "font-serif";
      case "playful":
        return "font-comic text-lg";
      case "elegant":
        return "font-playfair italic";
      default:
        return "font-sans";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card/80 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("prose max-w-none", getStyleClasses())}
          >
            {message || (
              <span className="text-muted-foreground">
                Your message will appear here...
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Characters: {charCount}</span>
        <span>Maximum: {maxLength}</span>
      </div>
    </div>
  );
};

export default MessagePreview;
