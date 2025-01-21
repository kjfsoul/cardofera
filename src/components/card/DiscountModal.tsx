import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface DiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  expiresAt: Date;
  percentage: number;
}

const DiscountModal = ({
  open,
  onOpenChange,
  code,
  expiresAt,
  percentage,
}: DiscountModalProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Discount code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Discount Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <motion.div
            className="p-6 bg-primary/10 rounded-lg text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <div className="text-3xl font-bold font-mono tracking-wider">
              {code}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {percentage}% off your order
            </div>
          </motion.div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Expires in: {timeLeft}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
