import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const MessagePreview = ({ message, style, maxLength = 500 }) => {
    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        setCharCount(message.length);
    }, [message]);
    const getStyleClasses = () => {
        switch (style) {
            case "modern":
                return "font-sans";
            case "classic":
                return "font-serif";
            case "playful":
                return "font-comic text-lg";
            case "elegant":
                return "font-playfair italic";
            default:
                return "font-sans";
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(Card, { className: "p-6 bg-card/80 backdrop-blur-sm", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: cn("prose max-w-none", getStyleClasses()), children: message || _jsx("span", { className: "text-muted-foreground", children: "Your message will appear here..." }) }, style) }) }), _jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [_jsxs("span", { children: ["Characters: ", charCount] }), _jsxs("span", { children: ["Maximum: ", maxLength] })] })] }));
};
export default MessagePreview;
