import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CardStyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const CardStyleSelector = ({ selectedStyle, onStyleSelect }: CardStyleSelectorProps) => {
  const styles = ["modern", "classic", "playful", "elegant"];

  return (
    <div className="space-y-2">
      <Label>Card Style</Label>
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => onStyleSelect(style)}
            className={cn(
              "p-4 rounded-lg border text-center capitalize transition-colors",
              selectedStyle === style
                ? "border-primary bg-primary/10"
                : "border-input hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardStyleSelector;