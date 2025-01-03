import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CardStyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const CardStyleSelector = ({ selectedStyle, onStyleSelect }: CardStyleSelectorProps) => {
  const styles = [
    {
      name: "modern",
      preview: "/modern-preview.svg",
      description: "Clean lines and minimalist design"
    },
    {
      name: "classic",
      preview: "/classic-preview.svg",
      description: "Timeless elegance with traditional elements"
    },
    {
      name: "playful",
      preview: "/playful-preview.svg",
      description: "Bright colors and fun patterns"
    },
    {
      name: "elegant",
      preview: "/elegant-preview.svg",
      description: "Sophisticated and refined design"
    }
  ];

  return (
    <div className="space-y-2">
      <Label>Card Style</Label>
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onStyleSelect(style.name)}
            className={cn(
              "group relative p-4 rounded-lg border text-center capitalize transition-colors overflow-hidden",
              selectedStyle === style.name
                ? "border-primary bg-primary/10"
                : "border-input hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
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
