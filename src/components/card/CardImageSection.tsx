import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import CardImageSearch from "./CardImageSearch";
import CardImagePrompt from "./CardImagePrompt";

interface CardImageSectionProps {
  showImageSearch: boolean;
  setShowImageSearch: (show: boolean) => void;
  setSelectedImages: (images: string[]) => void;
  isGenerating: boolean;
}

const CardImageSection = ({
  showImageSearch,
  setShowImageSearch,
  setSelectedImages,
  isGenerating,
}: CardImageSectionProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages([reader.result as string]);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Choose Your Image</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setShowImageSearch(!showImageSearch)}
            className="flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ImagePlus className="h-6 w-6" />
            <div className="text-sm text-center">
              <div className="font-semibold">Browse Images</div>
              <div className="text-muted-foreground">Search our collection</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group"
            asChild
          >
            <label>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Upload className="h-6 w-6" />
              <div className="text-sm text-center">
                <div className="font-semibold">Upload Image</div>
                <div className="text-muted-foreground">Use your own</div>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </Button>
        </div>

        {showImageSearch && (
          <CardImageSearch onImageSelect={setSelectedImages} />
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">AI Image Generation</h3>
          <p className="text-sm text-muted-foreground">
            Describe your perfect card image and let our AI create it for you
          </p>
          <CardImagePrompt
            onImageGenerate={(image) => setSelectedImages([image])}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </Card>
  );
};

export default CardImageSection;
