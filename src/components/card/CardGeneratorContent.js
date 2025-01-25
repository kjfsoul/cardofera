import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import CardImageSection from "./CardImageSection";
import CardDetailsSection from "./generator/CardDetailsSection";
import ImageGenerationSection from "./generator/ImageGenerationSection";
import StyleCustomizationSection from "./generator/StyleCustomizationSection";
import DeliverySection from "./generator/DeliverySection";
const CardGeneratorContent = ({ cardData, setCardData, selectedImage, setSelectedImage, isGenerating, handleGenerate, progress, isPremium, generationError, }) => {
    const [showImageSearch, setShowImageSearch] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(CardDetailsSection, { cardData: cardData, setCardData: setCardData, isGenerating: isGenerating, handleGenerate: handleGenerate }), _jsx(CardImageSection, { showImageSearch: showImageSearch, setShowImageSearch: setShowImageSearch, setSelectedImages: handleGeneratedImages, isGenerating: isGenerating }), _jsx(ImageGenerationSection, { generatedImages: generatedImages, selectedImageIndex: selectedImageIndex, handleImageSelect: handleImageSelect, handleGenerate: handleGenerate, isGenerating: isGenerating, progress: progress, generationError: generationError }), _jsx(StyleCustomizationSection, { cardData: cardData, setCardData: setCardData }), _jsx(DeliverySection, { cardData: cardData, setCardData: setCardData, isPremium: isPremium })] }));
};
export default CardGeneratorContent;
