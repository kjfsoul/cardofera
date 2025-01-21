import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const CardImageSearch = ({ onImageSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const handleGenerateAIImage = async () => {
        if (!searchQuery.trim()) {
            toast.error("Please enter a description for the image");
            return;
        }
        setIsGenerating(true);
        try {
            const { data, error } = await supabase.functions.invoke('generate-image', {
                body: {
                    prompt: searchQuery,
                    num_images: 3 // Request 3 images
                }
            });
            if (error)
                throw error;
            if (data.images && Array.isArray(data.images)) {
                setGeneratedImages(data.images);
                onImageSelect(data.images);
                toast.success("AI images generated successfully!");
            }
        }
        catch (error) {
            console.error('Error generating images:', error);
            toast.error("Failed to generate images. Please try again.");
        }
        finally {
            setIsGenerating(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "text", placeholder: "Describe the image you want (e.g., birthday cake with candles)", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onKeyPress: (e) => e.key === "Enter" && handleGenerateAIImage() }), _jsxs(Button, { onClick: handleGenerateAIImage, disabled: isGenerating, children: [_jsx(Wand2, { className: "h-4 w-4 mr-2" }), isGenerating ? "Generating..." : "Generate"] })] }), isGenerating && (_jsx("div", { className: "text-center text-muted-foreground animate-pulse", children: "Creating your custom card images... This may take a few moments." })), generatedImages.length > 0 && (_jsx("div", { className: "grid grid-cols-3 gap-4", children: generatedImages.map((imageUrl, index) => (_jsx("div", { className: "relative aspect-square", children: _jsx("img", { src: imageUrl, alt: `Generated image ${index + 1}`, className: "w-full h-full object-cover rounded-lg", onClick: () => onImageSelect([imageUrl]) }) }, index))) }))] }));
};
export default CardImageSearch;
