import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Percent } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SponsoredGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [playsRemaining, setPlaysRemaining] = useState(3);
  const queryClient = useQueryClient();

  const { data: gamePlays } = useQuery({
    queryKey: ['game_plays'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('game_plays')
        .select('*')
        .eq('user_id', user.id)
        .gte('played_at', today);
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (gamePlays) {
      setPlaysRemaining(Math.max(0, 3 - gamePlays.length));
    }
  }, [gamePlays]);

  const generateUniqueCode = () => {
    return `WIN${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const getExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString();
  };

  const playGameMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const discount = Math.floor(Math.random() * 31) + 20; // 20-50%
      const code = generateUniqueCode();
      const expiresAt = getExpiryDate();

      // Create discount code
      const { error: discountError } = await supabase
        .from('discount_codes')
        .insert({
          code,
          percentage: discount,
          expires_at: expiresAt,
          user_id: user.id
        });

      if (discountError) throw discountError;

      // Record game play
      const { error: gamePlayError } = await supabase
        .from('game_plays')
        .insert({
          discount_won: discount,
          user_id: user.id
        });

      if (gamePlayError) throw gamePlayError;

      return { discount, code };
    },
    onSuccess: ({ discount, code }) => {
      queryClient.invalidateQueries({ queryKey: ['game_plays'] });
      toast.success(
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <span>Congratulations! You won {discount}% off!</span>
          <span className="text-sm font-mono bg-primary/10 px-2 py-1 rounded">
            Code: {code}
          </span>
        </div>
      );
    },
    onError: (error) => {
      console.error('Error playing game:', error);
      toast.error("Failed to play game. Please try again.");
    }
  });

  const handleSpin = async () => {
    if (playsRemaining <= 0) {
      toast.error("No plays remaining today. Come back tomorrow!");
      return;
    }

    setIsSpinning(true);
    await playGameMutation.mutateAsync();
    setTimeout(() => setIsSpinning(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Spin & Win Discounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Spin the wheel to win discounts up to 50% off!
          </p>
          <p className="text-sm font-medium mt-2">
            {playsRemaining} plays remaining today
          </p>
        </div>

        <motion.div
          animate={isSpinning ? { rotate: 360 * 5 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="relative w-48 h-48 mx-auto"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Percent className="w-24 h-24 text-primary" />
          </div>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/20"
            />
          </svg>
        </motion.div>

        <Button
          onClick={handleSpin}
          disabled={isSpinning || playsRemaining <= 0}
          className="w-full"
        >
          {isSpinning ? "Spinning..." : "Spin to Win"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SponsoredGame;