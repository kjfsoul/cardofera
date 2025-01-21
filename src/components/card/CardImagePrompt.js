import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
const CardImagePrompt = ({ onImageGenerate, isGenerating, }) => {
    const [prompt, setPrompt] = useState("");
    const [rateLimitError, setRateLimitError] = useState(null);
    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter an image description");
            return;
        }
        try {
            setRateLimitError(null);
            const { data, error } = await supabase.functions.invoke("generate-image", {
                body: { prompt },
            });
            if (error) {
                // Check if it's a rate limit error (status 429)
                const errorBody = JSON.parse(error.message || "{}");
                if (errorBody.status === 429) {
                    setRateLimitError("Rate limit reached. Please wait a minute before trying again.");
                    return;
                }
                throw error;
            }
            if (data?.image) {
                onImageGenerate(data.image);
                toast.success("Image generated successfully!");
                setPrompt(""); // Clear prompt after successful generation
            }
            else {
                throw new Error("No image data received");
            }
        }
        catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to generate image. Please try again.");
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [rateLimitError && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: rateLimitError })] })), _jsx(Input, { placeholder: "Describe your perfect card image (e.g., 'A beautiful birthday cake with colorful candles')", value: prompt, onChange: (e) => setPrompt(e.target.value), className: "h-12" }), _jsxs(Button, { onClick: handleGenerate, disabled: isGenerating || !prompt.trim() || !!rateLimitError, className: "w-full h-12", children: [_jsx(Wand2, { className: "mr-2 h-5 w-5" }), isGenerating ? "Generating Image..." : "Generate Image with AI"] })] }));
};
export default CardImagePrompt;
