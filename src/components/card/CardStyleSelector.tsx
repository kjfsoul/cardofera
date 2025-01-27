import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { CardStyle } from "@/types/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardStyleSelectorProps {
  selectedStyle: CardStyle;
  onStyleSelect: (style: CardStyle) => void;
}

const CardStyleSelector = ({
  selectedStyle,
  onStyleSelect,
}: CardStyleSelectorProps) => {
  const styles = [
    {
      name: "modern" as CardStyle,
      preview: "/modern-preview.svg",
      description: "Clean lines and minimalist design",
      tooltip: "Perfect for professional and contemporary occasions",
    },
    {
      name: "classic" as CardStyle,
      preview: "/classic-preview.svg",
      description: "Timeless elegance with traditional elements",
      tooltip: "Ideal for formal events and traditional celebrations",
    },
    {
      name: "playful" as CardStyle,
      preview: "/playful-preview.svg",
      description: "Bright colors and fun patterns",
      tooltip: "Great for children's parties and casual celebrations",
    },
    {
      name: "elegant" as CardStyle,
      preview: "/elegant-preview.svg",
      description: "Sophisticated and refined design",
      tooltip: "Suitable for weddings and upscale events",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Card Style</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose a style that best matches your occasion</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onStyleSelect(style.name)}
            className={cn(
              "group relative p-4 rounded-lg border text-center capitalize transition-all duration-300",
              selectedStyle === style.name
                ? "border-primary bg-primary/10 scale-105"
                : "border-input hover:bg-accent hover:text-accent-foreground hover:scale-102",
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity rounded-lg"
              style={{ backgroundImage: `url(${style.preview})` }}
            />
            <div className="relative z-10">
              <div className="font-medium">{style.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {style.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardStyleSelector;