import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
const CardStyleSelector = ({ selectedStyle, onStyleSelect, }) => {
    const styles = [
        {
            name: "modern",
            preview: "/modern-preview.svg",
            description: "Clean lines and minimalist design",
            tooltip: "Perfect for professional and contemporary occasions",
        },
        {
            name: "classic",
            preview: "/classic-preview.svg",
            description: "Timeless elegance with traditional elements",
            tooltip: "Ideal for formal events and traditional celebrations",
        },
        {
            name: "playful",
            preview: "/playful-preview.svg",
            description: "Bright colors and fun patterns",
            tooltip: "Great for children's parties and casual celebrations",
        },
        {
            name: "elegant",
            preview: "/elegant-preview.svg",
            description: "Sophisticated and refined design",
            tooltip: "Suitable for weddings and upscale events",
        },
    ];
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Card Style" }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Info, { className: "h-4 w-4" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Choose a style that best matches your occasion" }) })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: styles.map((style) => (_jsxs("button", { onClick: () => onStyleSelect(style.name), className: cn("group relative p-4 rounded-lg border text-center capitalize transition-all duration-300", selectedStyle === style.name
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-input hover:bg-accent hover:text-accent-foreground hover:scale-102"), children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity rounded-lg", style: { backgroundImage: `url(${style.preview})` } }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "font-medium", children: style.name }), _jsx("div", { className: "text-xs text-muted-foreground mt-1", children: style.description })] })] }, style.name))) })] }));
};
export default CardStyleSelector;
