import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import CardHeader from "./card/CardHeader";
import CardGeneratorContent from "./card/CardGeneratorContent";
import CardPreviewSection from "./card/CardPreviewSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { CardDelivery } from "./card/CardDelivery";
import { CardDeliveryTracker } from "./card/CardDeliveryTracker";
import { trackEvent } from "@/utils/analytics";
const CardGenerator = () => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [cardData, setCardData] = useState({
        recipient: {
            name: "",
            email: "",
        },
        occasion: "birthday",
        message: "",
        style: "modern",
        deliveryMethod: "email",
        textPosition: "center",
        fontSize: 24,
        fontFamily: "Inter",
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [isPremium] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generationError, setGenerationError] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session }, } = await supabase.auth.getSession();
            if (!session) {
                toast.error("Please sign in to create cards");
                navigate("/signin");
            }
        };
        checkAuth();
    }, [navigate]);
    useEffect(() => {
        let completed = 0;
        if (cardData.recipient.name)
            completed++;
        if (cardData.message)
            completed++;
        if (cardData.style !== "modern")
            completed++;
        if (selectedImage)
            completed++;
        setProgress((completed / 4) * 100);
    }, [cardData, selectedImage]);
    const handleGenerate = async () => {
        if (!cardData.recipient.name || !cardData.message || !cardData.recipient.email) {
            toast.error("Please fill in all required fields including recipient email");
            return;
        }
        setIsGenerating(true);
        setGenerationError(null);
        try {
            const { data: { session }, } = await supabase.auth.getSession();
            if (!session) {
                toast.error("Please sign in to create cards");
                navigate("/signin");
                return;
            }
            if (!selectedImage) {
                const { data, error } = await supabase.functions.invoke("generate-image", {
                    body: {
                        prompt: `${cardData.occasion} card with message: ${cardData.message}`,
                        apiUrl: `${window.location.origin}/api/generate-image`,
                    },
                });
                if (error)
                    throw error;
                if (data?.image) {
                    setSelectedImage(data.image);
                }
            }
            const { data: cardRecord, error: saveError } = await supabase
                .from("card_deliveries")
                .insert([
                {
                    recipient_email: cardData.recipient.email || '',
                    card_image: selectedImage,
                    message: cardData.message,
                    status: "pending",
                },
            ])
                .select()
                .single();
            if (saveError)
                throw saveError;
            await trackEvent("card_created", cardRecord.id, {
                occasion: cardData.occasion,
                style: cardData.style,
            });
            toast.success("Card generated successfully!");
        }
        catch (error) {
            console.error("Generation error:", error);
            setGenerationError(error.message);
            toast.error("Failed to generate card. Please try again.");
        }
        finally {
            setIsGenerating(false);
        }
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx(CardHeader, { progress: progress }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(CardGeneratorContent, { cardData: cardData, setCardData: setCardData, selectedImage: selectedImage, setSelectedImage: setSelectedImage, isGenerating: isGenerating, handleGenerate: handleGenerate, progress: progress, isPremium: isPremium, generationError: generationError }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "lg:sticky lg:top-6", children: [_jsx(CardPreviewSection, { selectedImage: selectedImage, imageUrl: selectedImage, cardMessage: cardData.message, isSoundEnabled: isSoundEnabled, cardStyle: cardData.style, textPosition: cardData.textPosition, fontSize: cardData.fontSize, fontFamily: cardData.fontFamily }), selectedImage && !isGenerating && (_jsx(Card, { className: "mt-4 p-4", children: _jsx(CardDelivery, { cardRef: cardRef, recipientEmail: cardData.recipient.email, message: cardData.message }) }))] }), _jsx(CardDeliveryTracker, {})] })] })] }));
};
export default CardGenerator;
