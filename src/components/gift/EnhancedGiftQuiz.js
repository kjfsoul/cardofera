import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Gift, DollarSign, Heart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/utils/analytics";
export const EnhancedGiftQuiz = () => {
    const [step, setStep] = useState(1);
    const [quizState, setQuizState] = useState({
        interests: [],
        priceRange: [0, 500],
        occasion: "",
        style: "modern",
    });
    const handleStartQuiz = async () => {
        await trackEvent("quiz_started");
        setStep(1);
    };
    const handleQuizComplete = async () => {
        try {
            const { data: recommendations, error } = await supabase.functions.invoke("get-gift-recommendations", {
                body: { quizState },
            });
            if (error)
                throw error;
            await trackEvent("quiz_completed", undefined, { quizState });
            toast.success("Quiz completed! Check out your personalized recommendations");
            // Save quiz results
            await supabase.from("wish_lists").insert({
                quiz_results: quizState,
            });
        }
        catch (error) {
            console.error("Error completing quiz:", error);
            toast.error("Failed to get recommendations");
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Gift, { className: "h-5 w-5" }), "Gift Preference Quiz"] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-4", children: [step === 1 && (_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "What are your interests?" }), _jsx(Input, { placeholder: "Enter interests (comma separated)", onChange: (e) => setQuizState({
                                        ...quizState,
                                        interests: e.target.value.split(",").map((i) => i.trim()),
                                    }) }), _jsx(Button, { onClick: () => setStep(2), children: "Next" })] })), step === 2 && (_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Price Range" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(DollarSign, { className: "h-4 w-4" }), _jsx(Slider, { value: quizState.priceRange, min: 0, max: 1000, step: 10, onValueChange: (value) => setQuizState({
                                                ...quizState,
                                                priceRange: value,
                                            }) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setStep(1), children: "Back" }), _jsx(Button, { onClick: () => setStep(3), children: "Next" })] })] })), step === 3 && (_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "What's your preferred style?" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: ["modern", "classic", "playful", "elegant"].map((style) => (_jsx(Button, { variant: quizState.style === style ? "default" : "outline", onClick: () => setQuizState({ ...quizState, style }), children: style.charAt(0).toUpperCase() + style.slice(1) }, style))) }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setStep(2), children: "Back" }), _jsxs(Button, { onClick: handleQuizComplete, children: [_jsx(Heart, { className: "mr-2 h-4 w-4" }), "Get Recommendations"] })] })] }))] }) })] }));
};
