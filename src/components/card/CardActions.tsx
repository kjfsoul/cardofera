import { Button } from "@/components/ui/button";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import CardSoundToggle from "./CardSoundToggle";

interface CardActionsProps {
  showImageSearch: boolean;
  setShowImageSearch: (show: boolean) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (enabled: boolean) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowSponsoredGame: (show: boolean) => void;
  showSponsoredGame: boolean;
}

const CardActions = ({
  showImageSearch,
  setShowImageSearch,
  isSoundEnabled,
  setIsSoundEnabled,
  handleImageUpload,
  setShowSponsoredGame,
  showSponsoredGame,
}: CardActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setShowImageSearch(!showImageSearch)}
          className="flex-1"
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          {showImageSearch ? "Hide Image Search" : "Search Images"}
        </Button>
        <CardSoundToggle
          isSoundEnabled={isSoundEnabled}
          onToggle={() => setIsSoundEnabled(!isSoundEnabled)}
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" asChild>
          <label>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowSponsoredGame(!showSponsoredGame)}
          className="flex-1"
        >
          Play & Win
        </Button>
      </div>
    </div>
  );
};

export default CardActions;