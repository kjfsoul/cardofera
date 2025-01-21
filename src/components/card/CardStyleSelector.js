import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
const CardStyleSelector = ({ selectedStyle, onStyleSelect, }) => {
    const styles = [
        {
            name: "modern",
            preview: "/modern-preview.svg",
            description: "Clean lines and minimalist design",
        },
        {
            name: "classic",
            preview: "/classic-preview.svg",
            description: "Timeless elegance with traditional elements",
        },
        {
            name: "playful",
            preview: "/playful-preview.svg",
            description: "Bright colors and fun patterns",
        },
        {
            name: "elegant",
            preview: "/elegant-preview.svg",
            description: "Sophisticated and refined design",
        },
    ];
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Card Style" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: styles.map((style) => (_jsxs("button", { onClick: () => onStyleSelect(style.name), className: cn("group relative p-4 rounded-lg border text-center capitalize transition-colors overflow-hidden", selectedStyle === style.name
                        ? "border-primary bg-primary/10"
                        : "border-input hover:bg-accent hover:text-accent-foreground"), children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity", style: { backgroundImage: `url(${style.preview})` } }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "font-medium", children: style.name }), _jsx("div", { className: "text-xs text-muted-foreground mt-1", children: style.description })] })] }, style.name))) })] }));
};
export default CardStyleSelector;
