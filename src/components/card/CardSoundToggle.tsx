import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface CardSoundToggleProps {
  isSoundEnabled: boolean;
  onToggle: () => void;
}

const CardSoundToggle = ({
  isSoundEnabled,
  onToggle,
}: CardSoundToggleProps) => {
  return (
    <Button variant="outline" onClick={onToggle} className="flex-1">
      {isSoundEnabled ? (
        <Volume2 className="mr-2 h-4 w-4" />
      ) : (
        <VolumeX className="mr-2 h-4 w-4" />
      )}
      {isSoundEnabled ? "Disable Sound" : "Enable Sound"}
    </Button>
  );
};

export default CardSoundToggle;
