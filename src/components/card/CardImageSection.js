import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import CardImageSearch from "./CardImageSearch";
import CardImagePrompt from "./CardImagePrompt";
const CardImageSection = ({ showImageSearch, setShowImageSearch, setSelectedImages, isGenerating, }) => {
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages([reader.result]);
                toast.success("Image uploaded successfully!");
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "2. Choose Your Image" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(Button, { variant: "outline", onClick: () => setShowImageSearch(!showImageSearch), className: "flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(ImagePlus, { className: "h-6 w-6" }), _jsxs("div", { className: "text-sm text-center", children: [_jsx("div", { className: "font-semibold", children: "Browse Images" }), _jsx("div", { className: "text-muted-foreground", children: "Search our collection" })] })] }), _jsx(Button, { variant: "outline", className: "flex flex-col items-center justify-center gap-2 h-24 relative overflow-hidden group", asChild: true, children: _jsxs("label", { children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(Upload, { className: "h-6 w-6" }), _jsxs("div", { className: "text-sm text-center", children: [_jsx("div", { className: "font-semibold", children: "Upload Image" }), _jsx("div", { className: "text-muted-foreground", children: "Use your own" })] }), _jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleImageUpload })] }) })] }), showImageSearch && (_jsx(CardImageSearch, { onImageSelect: setSelectedImages })), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "AI Image Generation" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Describe your perfect card image and let our AI create it for you" }), _jsx(CardImagePrompt, { onImageGenerate: (image) => setSelectedImages([image]), isGenerating: isGenerating })] })] })] }));
};
export default CardImageSection;
