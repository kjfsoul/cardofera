import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import CardImageSection from "./CardImageSection";
import CardDetailsSection from "./generator/CardDetailsSection";
import ImageGenerationSection from "./generator/ImageGenerationSection";
import StyleCustomizationSection from "./generator/StyleCustomizationSection";
import DeliverySection from "./generator/DeliverySection";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { toast } from "sonner";
import TextureManager from "./TextureManager";
const CardGeneratorContent = ({ cardData, setCardData, selectedImage, setSelectedImage, isGenerating, handleGenerate, progress, isPremium, generationError, }) => {
    const [showImageSearch, setShowImageSearch] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedTexture, setSelectedTexture] = useState(undefined);
    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
        if (generatedImages[index]) {
            setSelectedImage(generatedImages[index]);
        }
    };
    const handleGeneratedImages = (images) => {
        setGeneratedImages(images);
        if (images.length > 0) {
            setSelectedImage(images[0]);
            setSelectedImageIndex(0);
        }
    };
    const handleTextureSelect = (textureUrl) => {
        setSelectedTexture(textureUrl === "none" ? undefined : textureUrl);
        setCardData({
            ...cardData,
            texture: textureUrl === "none" ? undefined : textureUrl,
        });
    };
    const handleReset = () => {
        setCardData({
            ...cardData,
            message: "",
            style: "modern",
            textPosition: "center",
            fontSize: 16,
            fontFamily: "Inter",
            texture: undefined,
        });
        setSelectedImage(undefined);
        setSelectedTexture(undefined);
        setGeneratedImages([]);
        setSelectedImageIndex(null);
        toast.success("All card settings have been reset");
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Create Your Card" }), _jsxs(Button, { variant: "outline", onClick: handleReset, className: "flex items-center gap-2", children: [_jsx(Eraser, { className: "h-4 w-4" }), "Reset All"] })] }), _jsx(CardDetailsSection, { cardData: cardData, setCardData: setCardData, isGenerating: isGenerating, handleGenerate: handleGenerate }), _jsx(TextureManager, { onTextureSelect: handleTextureSelect }), _jsx(CardImageSection, { showImageSearch: showImageSearch, setShowImageSearch: setShowImageSearch, setSelectedImages: handleGeneratedImages, isGenerating: isGenerating }), _jsx(ImageGenerationSection, { generatedImages: generatedImages, selectedImageIndex: selectedImageIndex, handleImageSelect: handleImageSelect, handleGenerate: handleGenerate, isGenerating: isGenerating, progress: progress, generationError: generationError }), _jsx(StyleCustomizationSection, { cardData: cardData, setCardData: setCardData }), _jsx(DeliverySection, { cardData: cardData, setCardData: setCardData, isPremium: isPremium })] }));
};
export default CardGeneratorContent;
