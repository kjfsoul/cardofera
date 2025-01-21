import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AuraColor } from "@/types/gift";
import AuraColorSelector from "./AuraColorSelector";

interface QuickSendGiftProps {
  recipientName: string;
  onSend: (auraColor: AuraColor) => Promise<void>;
}

const QuickSendGift = ({ recipientName, onSend }: QuickSendGiftProps) => {
  const [selectedColor, setSelectedColor] = useState<AuraColor | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleQuickSend = async () => {
    if (!selectedColor) {
      toast.error("Please select an aura color first");
      return;
    }

    setIsSending(true);
    try {
      await onSend(selectedColor);
      toast.success(
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <span>Gift sent successfully to {recipientName}!</span>
        </div>,
      );
    } catch (error) {
      toast.error("Failed to send gift. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <AuraColorSelector
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />

      {selectedColor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border"
        >
          <Button
            onClick={handleQuickSend}
            disabled={isSending}
            className="w-full"
          >
            <Gift className="mr-2 h-4 w-4" />
            {isSending ? "Sending..." : "Quick Send Gift"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuickSendGift;
