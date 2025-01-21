import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface CardDownloadShareProps {
  imageUrl: string | null;
  isGenerating: boolean;
}

const CardDownloadShare = ({
  imageUrl,
  isGenerating,
}: CardDownloadShareProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) {
      toast.error("Please generate a card first");
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "birthday-card.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download card");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Card',
          text: 'Check out my card!',
          url: window.location.href,
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="default"
        className="w-full flex items-center justify-center gap-2"
        disabled={isGenerating || isDownloading || !imageUrl}
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
        onClick={handleShare}
    className="flex items-center gap-2 rounded-lg border p-2 text-sm"
  >
          <Share2 className="h-4 w-4" />
    Share
  </button>
)}
    </div>
  );
};

export default CardDownloadShare;