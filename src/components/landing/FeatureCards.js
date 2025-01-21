import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles, Gift, Calendar } from "lucide-react";
const FeatureCards = ({ onFeatureClick }) => {
    const features = [
        {
            title: "AI-Powered Cards",
            description: "Create unique birthday cards with our AI technology",
            icon: Sparkles,
            section: "cards"
        },
        {
            title: "Smart Gift Finder",
            description: "Get personalized gift recommendations",
            icon: Gift,
            section: "gifts"
        },
        {
            title: "Never Miss a Birthday",
            description: "Sync with your calendar and get reminders",
            icon: Calendar,
            section: "calendar"
        }
    ];
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-16", children: features.map((feature, index) => (_jsxs(Card, { className: "p-6 glass-card hover:scale-105 transition-transform duration-300 cursor-pointer", onClick: () => onFeatureClick(feature.section), role: "button", tabIndex: 0, onKeyPress: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onFeatureClick(feature.section);
                }
            }, children: [_jsx(feature.icon, { className: "h-12 w-12 text-primary mb-4" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.title }), _jsx("p", { className: "text-foreground/60", children: feature.description })] }, index))) }));
};
export default FeatureCards;
