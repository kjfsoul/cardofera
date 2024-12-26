import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, RotateCcw } from "lucide-react";
import RecipientSelect from "./RecipientSelect";

interface CardFormProps {
  cardData: {
    recipientName: string;
    occasion: string;
    message: string;
    style: string;
    deliveryMethod: string;
  };
  setCardData: (data: any) => void;
  isGenerating: boolean;
  handleGenerate: () => Promise<void>;
}

const CardForm = ({
  cardData,
  setCardData,
  isGenerating,
  handleGenerate,
}: CardFormProps) => {
  const occasions = [
    "birthday",
    "anniversary",
    "congratulations",
    "thank-you",
    "christmas",
    "new-year",
    "valentine's-day",
    "mother's-day",
    "father's-day",
    "graduation",
    "wedding",
    "baby-shower",
    "halloween",
    "easter",
    "thanksgiving",
  ];

  const handleReset = () => {
    setCardData({
      recipientName: "",
      occasion: "birthday",
      message: "",
      style: "modern",
      deliveryMethod: "email",
    });
  };

  const handleAutoSuggest = () => {
    const suggestedMessage = `Dear ${cardData.recipientName},\nWishing you a wonderful ${cardData.occasion}!`;
    setCardData({ ...cardData, message: suggestedMessage });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Label htmlFor="recipientName">Recipient's Name</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All
        </Button>
      </div>

      <RecipientSelect
        value={cardData.recipientName}
        onChange={(value) =>
          setCardData({ ...cardData, recipientName: value })
        }
      />

      <div className="space-y-2">
        <Label htmlFor="occasion">Occasion</Label>
        <select
          id="occasion"
          value={cardData.occasion}
          onChange={(e) =>
            setCardData({ ...cardData, occasion: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          {occasions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion.charAt(0).toUpperCase() +
                occasion.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="message">Message</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoSuggest}
            disabled={isGenerating}
            className="text-primary"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Auto-Suggest
          </Button>
        </div>
        <Textarea
          id="message"
          value={cardData.message}
          onChange={(e) => setCardData({ ...cardData, message: e.target.value })}
          placeholder="Enter your message or click Auto-Suggest"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default CardForm;