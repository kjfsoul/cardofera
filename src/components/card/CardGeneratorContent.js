import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, AlignLeft, AlignCenter, AlignRight, RefreshCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CardForm from "./CardForm";
import CardStyleSelector from "./CardStyleSelector";
import CardImageSection from "./CardImageSection";
import DeliverySelector from "./DeliverySelector";
import PremiumFeatures from "./PremiumFeatures";
const CardGeneratorContent = ({ cardData, setCardData, selectedImage, setSelectedImage, isGenerating, handleGenerate, progress, isPremium, generationError, }) => {
    const [showImageSearch, setShowImageSearch] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const handleRetry = async () => {
        await handleGenerate();
    };
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
    const fonts = [
        "Inter",
        "Playfair Display",
        "Roboto Mono",
        "Comic Sans MS",
        "Dancing Script",
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "1. Card Details" }), _jsx(CardForm, { cardData: cardData, setCardData: setCardData, isGenerating: isGenerating, handleGenerate: handleGenerate })] }), _jsx(CardImageSection, { showImageSearch: showImageSearch, setShowImageSearch: setShowImageSearch, setSelectedImages: handleGeneratedImages, isGenerating: isGenerating }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "2. Generate Your Image" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-3 gap-4", children: [0, 1, 2].map((index) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-full h-48 bg-gray-100 rounded-lg mb-2", children: generatedImages[index] && (_jsx("img", { src: generatedImages[index], alt: `Generated option ${index + 1}`, className: "w-full h-full object-cover rounded-lg" })) }), _jsx(Button, { variant: selectedImageIndex === index ? "default" : "outline", className: "w-full", onClick: () => handleImageSelect(index), disabled: !generatedImages[index], children: generatedImages[index] ? "Select" : `Option ${index + 1}` })] }, index))) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: handleGenerate, className: "flex-1 h-12 text-lg", disabled: isGenerating || progress < 100, children: [_jsx(Wand2, { className: "mr-2 h-5 w-5" }), isGenerating ? "Generating..." : "Generate Options"] }), _jsxs(Button, { variant: "secondary", className: "h-12", onClick: handleRetry, children: [_jsx(RefreshCw, { className: "mr-2 h-5 w-5" }), "Retry"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h3", { className: "font-medium mb-2", children: "AI Generation Tips" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Be specific about colors and themes" }), _jsx("li", { children: "\u2022 Mention any special occasions" }), _jsx("li", { children: "\u2022 Include preferred art styles" }), _jsx("li", { children: "\u2022 Specify if you want text incorporated" })] })] }), generationError && (_jsx("div", { className: "text-red-500 text-sm", children: generationError }))] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "3. Choose Your Style" }), _jsx(CardStyleSelector, { selectedStyle: cardData.style, onStyleSelect: (style) => setCardData({ ...cardData, style }) }), _jsxs("div", { className: "mt-6 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Text Position" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: cardData.textPosition === "left" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "left" }), children: _jsx(AlignLeft, { className: "h-4 w-4" }) }), _jsx(Button, { variant: cardData.textPosition === "center" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "center" }), children: _jsx(AlignCenter, { className: "h-4 w-4" }) }), _jsx(Button, { variant: cardData.textPosition === "right" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "right" }), children: _jsx(AlignRight, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Font" }), _jsx("select", { className: "w-full rounded-md border border-input bg-background px-3 py-2", value: cardData.fontFamily, onChange: (e) => setCardData({ ...cardData, fontFamily: e.target.value }), children: fonts.map((font) => (_jsx("option", { value: font, style: { fontFamily: font }, children: font }, font))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Font Size" }), _jsx(Slider, { value: [cardData.fontSize], onValueChange: (value) => setCardData({ ...cardData, fontSize: value[0] }), min: 12, max: 48, step: 1, className: "w-full" }), _jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [cardData.fontSize, "px"] })] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "4. Delivery Method" }), _jsx(DeliverySelector, { selectedMethod: cardData.deliveryMethod, onMethodSelect: (method) => setCardData({ ...cardData, deliveryMethod: method }), isPremium: isPremium })] }), !isPremium && _jsx(PremiumFeatures, { isPremium: isPremium })] }));
};
export default CardGeneratorContent;
