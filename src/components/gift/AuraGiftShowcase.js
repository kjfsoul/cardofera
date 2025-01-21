import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Heart, Send, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AURA_CATEGORIES, AURA_COLORS } from "@/types/gift";
const AuraGiftShowcase = ({ selectedAura, onAuraSelect }) => {
    const [priceRange, setPriceRange] = useState([50, 200]);
    const queryClient = useQueryClient();
    const { data: gifts, isLoading } = useQuery({
        queryKey: ['gifts', selectedAura, priceRange],
        queryFn: async () => {
            const query = supabase
                .from('gift_recommendations')
                .select('*')
                .gte('price', priceRange[0])
                .lte('price', priceRange[1]);
            if (selectedAura) {
                query.eq('category', AURA_CATEGORIES[selectedAura]);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data;
        }
    });
    const addToFavoritesMutation = useMutation({
        mutationFn: async (giftId) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user)
                throw new Error('User not authenticated');
            const { error } = await supabase
                .from('gift_favorites')
                .insert({
                gift_id: giftId,
                user_id: user.id
            });
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success("Added to favorites!");
        },
        onError: (error) => {
            console.error('Error adding to favorites:', error);
            toast.error("Failed to add to favorites");
        }
    });
    const handleQuickSend = async (giftId) => {
        // This will be connected to the gift sending system
        toast.success("Opening gift sending options...");
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex flex-wrap gap-4 justify-center", children: Object.entries(AURA_CATEGORIES).map(([color, name]) => (_jsx(Button, { variant: selectedAura === color ? "default" : "outline", className: `${selectedAura === color ? AURA_COLORS[color] : ''}`, onClick: () => onAuraSelect(color), children: name }, color))) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(DollarSign, { className: "h-4 w-4" }), _jsx("div", { className: "flex-1", children: _jsx(Slider, { value: priceRange, min: 0, max: 500, step: 10, onValueChange: setPriceRange }) }), _jsxs("span", { className: "text-sm", children: ["$", priceRange[0], " - $", priceRange[1]] })] }), isLoading ? (_jsx("div", { className: "text-center py-8", children: "Loading gifts..." })) : (_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: gifts?.map((gift) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs("div", { className: "relative aspect-video", children: [_jsx("img", { src: gift.image_url || "/placeholder.svg", alt: gift.name, className: "object-cover w-full h-full" }), _jsxs("div", { className: "absolute top-2 right-2 flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", className: "bg-background/80 backdrop-blur-sm", onClick: () => addToFavoritesMutation.mutate(gift.id), children: _jsx(Heart, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", className: "bg-background/80 backdrop-blur-sm", onClick: () => handleQuickSend(gift.id), children: _jsx(Send, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: gift.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: gift.description })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "secondary", children: gift.category }), _jsxs("span", { className: "font-semibold", children: ["$", gift.price] })] })] })] }, gift.id))) }, selectedAura || 'all') }))] }));
};
export default AuraGiftShowcase;
