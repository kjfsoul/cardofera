import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import CardPreview3D from "./CardPreview3D";

interface CardPreviewSectionProps {
  selectedImage: string | null;
  currentSampleImage: number;
  sampleImages: string[];
  cardMessage: string;
  isSoundEnabled: boolean;
}

const CardPreviewSection = ({
  selectedImage,
  currentSampleImage,
  sampleImages,
  cardMessage,
  isSoundEnabled,
}: CardPreviewSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <CardPreview3D
        imageUrl={selectedImage || sampleImages[currentSampleImage]}
        text={cardMessage}
        enableSound={isSoundEnabled}
      />

      <div className="flex gap-4">
        <Button
          onClick={() => toast.success("Download started!")}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button
          onClick={() => toast.success("Sharing options coming soon!")}
          variant="outline"
          className="flex-1"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default CardPreviewSection;