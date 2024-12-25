import { Button } from "@/components/ui/button";
import { AURA_CATEGORIES, AURA_COLORS, type AuraColor } from "@/types/gift";
import { cn } from "@/lib/utils";

interface AuraColorSelectorProps {
  selectedColor: AuraColor | null;
  onColorSelect: (color: AuraColor) => void;
}

const AuraColorSelector = ({ selectedColor, onColorSelect }: AuraColorSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(Object.entries(AURA_CATEGORIES) as [AuraColor, string][]).map(([color, name]) => (
        <Button
          key={color}
          variant={selectedColor === color ? "default" : "outline"}
          className={cn(
            "flex items-center gap-2 p-4",
            selectedColor === color && AURA_COLORS[color as AuraColor]
          )}
          onClick={() => onColorSelect(color as AuraColor)}
        >
          <div className={cn("w-4 h-4 rounded-full", AURA_COLORS[color as AuraColor])} />
          <span>{name}</span>
        </Button>
      ))}
    </div>
  );
};

export default AuraColorSelector;