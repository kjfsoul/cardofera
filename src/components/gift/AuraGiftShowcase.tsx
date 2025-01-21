import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart, Send, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AURA_CATEGORIES, AURA_COLORS, type AuraColor } from "@/types/gift";

interface AuraGiftShowcaseProps {
  selectedAura?: AuraColor;
  onAuraSelect: (aura: AuraColor) => void;
}

const AuraGiftShowcase = ({
  selectedAura,
  onAuraSelect,
}: AuraGiftShowcaseProps) => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const queryClient = useQueryClient();

  const { data: gifts, isLoading } = useQuery({
    queryKey: ["gifts", selectedAura, priceRange],
    queryFn: async () => {
      const query = supabase
        .from("gift_recommendations")
        .select("*")
        .gte("price", priceRange[0])
        .lte("price", priceRange[1]);

      if (selectedAura) {
        query.eq("category", AURA_CATEGORIES[selectedAura]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const addToFavoritesMutation = useMutation({
    mutationFn: async (giftId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from("gift_favorites").insert({
        gift_id: giftId,
        user_id: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites!");
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add to favorites");
    },
  });

  const handleQuickSend = async (giftId: string) => {
    // This will be connected to the gift sending system
    toast.success("Opening gift sending options...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {(Object.entries(AURA_CATEGORIES) as [AuraColor, string][]).map(
          ([color, name]) => (
            <Button
              key={color}
              variant={selectedAura === color ? "default" : "outline"}
              className={`${selectedAura === color ? AURA_COLORS[color as AuraColor] : ""}`}
              onClick={() => onAuraSelect(color as AuraColor)}
            >
              {name}
            </Button>
          ),
        )}
      </div>

      <div className="flex items-center gap-4">
        <DollarSign className="h-4 w-4" />
        <div className="flex-1">
          <Slider
            value={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={setPriceRange}
          />
        </div>
        <span className="text-sm">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading gifts...</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAura || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {gifts?.map((gift) => (
              <Card key={gift.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={gift.image_url || "/placeholder.svg"}
                    alt={gift.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => addToFavoritesMutation.mutate(gift.id)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => handleQuickSend(gift.id)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold">{gift.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {gift.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{gift.category}</Badge>
                    <span className="font-semibold">${gift.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AuraGiftShowcase;
