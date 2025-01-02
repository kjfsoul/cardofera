import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Gift, DollarSign, Heart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/utils/analytics";

interface QuizState {
  interests: string[];
  priceRange: [number, number];
  occasion: string;
  style: string;
}

export const EnhancedGiftQuiz = () => {
  const [step, setStep] = useState(1);
  const [quizState, setQuizState] = useState<QuizState>({
    interests: [],
    priceRange: [0, 500],
    occasion: "",
    style: "modern"
  });

  const handleStartQuiz = async () => {
    await trackEvent("quiz_started");
    setStep(1);
  };

  const handleQuizComplete = async () => {
    try {
      const { data: recommendations, error } = await supabase.functions.invoke(
        "get-gift-recommendations",
        {
          body: { quizState }
        }
      );

      if (error) throw error;

      await trackEvent("quiz_completed", undefined, { quizState });
      toast.success("Quiz completed! Check out your personalized recommendations");

      // Save quiz results
      await supabase.from("wish_lists").insert({
        quiz_results: quizState
      });

    } catch (error) {
      console.error("Error completing quiz:", error);
      toast.error("Failed to get recommendations");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Gift Preference Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {step === 1 && (
            <div className="space-y-4">
              <Label>What are your interests?</Label>
              <Input
                placeholder="Enter interests (comma separated)"
                onChange={(e) =>
                  setQuizState({
                    ...quizState,
                    interests: e.target.value.split(",").map((i) => i.trim())
                  })
                }
              />
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Price Range</Label>
              <div className="flex items-center gap-4">
                <DollarSign className="h-4 w-4" />
                <Slider
                  value={quizState.priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) =>
                    setQuizState({ ...quizState, priceRange: value as [number, number] })
                  }
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>What's your preferred style?</Label>
              <div className="grid grid-cols-2 gap-4">
                {["modern", "classic", "playful", "elegant"].map((style) => (
                  <Button
                    key={style}
                    variant={quizState.style === style ? "default" : "outline"}
                    onClick={() => setQuizState({ ...quizState, style })}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleQuizComplete}>
                  <Heart className="mr-2 h-4 w-4" />
                  Get Recommendations
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};