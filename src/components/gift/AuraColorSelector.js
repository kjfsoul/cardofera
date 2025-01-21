import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { AURA_CATEGORIES, AURA_COLORS } from "@/types/gift";
import { cn } from "@/lib/utils";
const AuraColorSelector = ({ selectedColor, onColorSelect, }) => {
    return (_jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(AURA_CATEGORIES).map(([color, name]) => (_jsxs(Button, { variant: selectedColor === color ? "default" : "outline", className: cn("flex items-center gap-2 p-4", selectedColor === color && AURA_COLORS[color]), onClick: () => onColorSelect(color), children: [_jsx("div", { className: cn("w-4 h-4 rounded-full", AURA_COLORS[color]) }), _jsx("span", { children: name })] }, color))) }));
};
export default AuraColorSelector;
