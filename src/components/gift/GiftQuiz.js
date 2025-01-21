import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, DollarSign, Tag, Percent } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const GiftQuiz = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [budget, setBudget] = useState([50, 200]);
    const [interests, setInterests] = useState([]);
    const [matchScore, setMatchScore] = useState(0);
    const { data: contacts } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('contacts')
                .select('*');
            if (error)
                throw error;
            return data;
        }
    });
    useEffect(() => {
        if (selectedContact) {
            setInterests(selectedContact.preferred_categories || []);
            calculateMatchScore();
        }
    }, [selectedContact]);
    const calculateMatchScore = () => {
        if (!selectedContact)
            return;
        // Simple scoring based on filled information
        let score = 0;
        if (selectedContact)
            score += 30;
        if (interests.length > 0)
            score += 40;
        if (budget[0] !== budget[1])
            score += 30;
        setMatchScore(score);
    };
    const handleSubmit = async () => {
        if (!selectedContact) {
            toast.error("Please select a recipient");
            return;
        }
        toast.success("Generating personalized recommendations...");
        // This will be connected to the recommendation engine
    };
    return (_jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5" }), "Gift Recommendation Quiz"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Select Recipient" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: contacts?.map((contact) => (_jsxs(Button, { variant: selectedContact?.id === contact.id ? "default" : "outline", onClick: () => setSelectedContact(contact), className: "justify-start", children: [_jsx(User, { className: "mr-2 h-4 w-4" }), contact.name] }, contact.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Budget Range" }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["$", budget[0], " - $", budget[1]] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(DollarSign, { className: "h-4 w-4" }), _jsx(Slider, { value: budget, min: 0, max: 500, step: 10, onValueChange: setBudget, className: "flex-1" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Interests" }), _jsx("div", { className: "flex flex-wrap gap-2", children: interests.map((interest) => (_jsxs(Badge, { variant: "secondary", children: [_jsx(Tag, { className: "mr-2 h-3 w-3" }), interest] }, interest))) })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "flex items-center justify-between p-4 bg-primary/5 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Percent, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "font-medium", children: "Match Score" })] }), _jsxs("span", { className: "text-2xl font-bold text-primary", children: [matchScore, "%"] })] }), _jsx(Button, { onClick: handleSubmit, className: "w-full", children: "Get Recommendations" })] })] }));
};
export default GiftQuiz;
