import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface CardFormProps {
  cardData: {
    recipientName: string;
    occasion: string;
    message: string;
    style: string;
  };
  setCardData: (data: any) => void;
  handleAutoSuggest: () => void;
  handleReset: () => void;
  isGenerating: boolean;
}

const CardForm = ({ cardData, setCardData, handleAutoSuggest, handleReset, isGenerating }: CardFormProps) => {
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
    "thanksgiving"
  ];

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

      <Input
        id="recipientName"
        value={cardData.recipientName}
        onChange={(e) =>
          setCardData({ ...cardData, recipientName: e.target.value })
        }
        placeholder="Enter recipient's name"
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
              {occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ')}
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