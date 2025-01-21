import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
const CardDownloadShare = ({ imageUrl, isGenerating }) => {
    const [isCopied, setIsCopied] = useState(false);
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
        }
        catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download card");
        }
        finally {
            setIsDownloading(false);
        }
    };
    const handleShare = async () => {
        if (!imageUrl) {
            toast.error("Please generate a card first");
            return;
        }
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Birthday Card",
                    text: "Check out this birthday card I created!",
                    url: imageUrl,
                });
                toast.success("Card shared successfully!");
            }
            else {
                await navigator.clipboard.writeText(imageUrl);
                setIsCopied(true);
                toast.success("Link copied to clipboard!");
                setTimeout(() => setIsCopied(false), 2000);
            }
        }
        catch (error) {
            console.error("Share error:", error);
            toast.error("Failed to share card");
        }
    };
    return (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(Button, { variant: "default", className: "w-full flex items-center justify-center gap-2", disabled: isGenerating || isDownloading || !imageUrl, onClick: handleDownload, children: [_jsx(Download, { className: "h-4 w-4" }), isDownloading ? "Downloading..." : "Download"] }), _jsxs(Button, { variant: "secondary", className: "w-full flex items-center justify-center gap-2", disabled: isGenerating || !imageUrl, onClick: handleShare, children: [navigator.share ? (_jsx(Share2, { className: "h-4 w-4" })) : isCopied ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(Copy, { className: "h-4 w-4" })), isCopied ? "Copied!" : "Share"] })] }));
};
export default CardDownloadShare;
