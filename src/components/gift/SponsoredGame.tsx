import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SponsoredGameProps {
  onWin: (discount: number) => void;
}

const SponsoredGame = ({ onWin }: SponsoredGameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playsRemaining, setPlaysRemaining] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const lastPlayDate = localStorage.getItem('lastPlayDate');
    const today = new Date().toDateString();
    
    if (lastPlayDate !== today) {
      localStorage.setItem('lastPlayDate', today);
      localStorage.setItem('playsRemaining', '3');
      setPlaysRemaining(3);
    } else {
      const remaining = Number(localStorage.getItem('playsRemaining')) || 0;
      setPlaysRemaining(remaining);
    }
  }, []);

  const handlePlay = async () => {
    if (playsRemaining <= 0) {
      toast.error("No plays remaining today. Come back tomorrow!");
      return;
    }

    setIsPlaying(true);
    setIsSpinning(true);

    // Simulate wheel spin
    const spinDuration = 2000;
    const discount = Math.floor(Math.random() * 31) + 20; // Random discount between 20-50%

    setTimeout(() => {
      setIsSpinning(false);
      toast.success(
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <span>Congratulations! You won a {discount}% discount!</span>
        </div>
      );
      onWin(discount);
      
      const newPlaysRemaining = playsRemaining - 1;
      setPlaysRemaining(newPlaysRemaining);
      localStorage.setItem('playsRemaining', String(newPlaysRemaining));
      
      setIsPlaying(false);
    }, spinDuration);
  };

  return (
    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
      <h3 className="text-lg font-semibold mb-2">Win Gift Package Discounts!</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Spin the wheel to win discounts up to 50% off. {playsRemaining} plays remaining today.
      </p>
      <motion.div
        animate={isSpinning ? { rotate: 360 * 5 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-24 h-24 mx-auto mb-4"
      >
        <Gift className="w-full h-full text-primary" />
      </motion.div>
      <Button
        variant="outline"
        onClick={handlePlay}
        disabled={isPlaying || playsRemaining <= 0}
        className="w-full"
      >
        <Gift className="mr-2 h-4 w-4" />
        {isPlaying ? "Spinning..." : "Spin to Win"}
      </Button>
    </div>
  );
};

export default SponsoredGame;