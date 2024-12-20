import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, DollarSign, Heart } from "lucide-react";
import { toast } from "sonner";

interface QuizData {
  recipientAge: string;
  relationship: string;
  interests: string[];
  budget: {
    min: number;
    max: number;
  };
  occasion: string;
}

const GiftQuiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    recipientAge: "",
    relationship: "",
    interests: [],
    budget: { min: 0, max: 100 },
    occasion: "birthday",
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Integrate with AI recommendation engine
    toast.success("Generating personalized gift recommendations...");
    console.log("Quiz data:", quizData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Gift Recommendation Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Recipient's Age</Label>
              <Input
                id="age"
                type="number"
                value={quizData.recipientAge}
                onChange={(e) =>
                  setQuizData({ ...quizData, recipientAge: e.target.value })
                }
                placeholder="Enter age"
              />
            </div>
            <div>
              <Label>Relationship</Label>
              <RadioGroup
                value={quizData.relationship}
                onValueChange={(value) =>
                  setQuizData({ ...quizData, relationship: value })
                }
                className="grid grid-cols-2 gap-4 mt-2"
              >
                {["Family", "Friend", "Colleague", "Partner"].map((rel) => (
                  <div key={rel} className="flex items-center space-x-2">
                    <RadioGroupItem value={rel.toLowerCase()} id={rel} />
                    <Label htmlFor={rel}>{rel}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>Budget Range</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="minBudget">Minimum ($)</Label>
                <Input
                  id="minBudget"
                  type="number"
                  value={quizData.budget.min}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      budget: { ...quizData.budget, min: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="maxBudget">Maximum ($)</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  value={quizData.budget.max}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      budget: { ...quizData.budget, max: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label>Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Technology",
                "Books",
                "Fashion",
                "Sports",
                "Art",
                "Music",
                "Gaming",
                "Cooking",
              ].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={interest}
                    checked={quizData.interests.includes(interest)}
                    onChange={(e) => {
                      const newInterests = e.target.checked
                        ? [...quizData.interests, interest]
                        : quizData.interests.filter((i) => i !== interest);
                      setQuizData({ ...quizData, interests: newInterests });
                    }}
                    className="form-checkbox h-4 w-4"
                  />
                  <Label htmlFor={interest}>{interest}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {step < 4 ? "Next" : "Get Recommendations"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftQuiz;