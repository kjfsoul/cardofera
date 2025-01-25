import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CardStyleSelector from "../CardStyleSelector";
const StyleCustomizationSection = ({ cardData, setCardData, }) => {
    const fonts = [
        "Inter",
        "Playfair Display",
        "Roboto Mono",
        "Comic Sans MS",
        "Dancing Script",
    ];
    return (_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "3. Choose Your Style" }), _jsx(CardStyleSelector, { selectedStyle: cardData.style, onStyleSelect: (style) => setCardData({ ...cardData, style }) }), _jsxs("div", { className: "mt-6 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Text Position" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: cardData.textPosition === "left" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "left" }), children: _jsx(AlignLeft, { className: "h-4 w-4" }) }), _jsx(Button, { variant: cardData.textPosition === "center" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "center" }), children: _jsx(AlignCenter, { className: "h-4 w-4" }) }), _jsx(Button, { variant: cardData.textPosition === "right" ? "default" : "outline", size: "sm", onClick: () => setCardData({ ...cardData, textPosition: "right" }), children: _jsx(AlignRight, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Font" }), _jsx("select", { className: "w-full rounded-md border border-input bg-background px-3 py-2", value: cardData.fontFamily, onChange: (e) => setCardData({ ...cardData, fontFamily: e.target.value }), children: fonts.map((font) => (_jsx("option", { value: font, style: { fontFamily: font }, children: font }, font))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Font Size" }), _jsx(Slider, { value: [cardData.fontSize], onValueChange: (value) => setCardData({ ...cardData, fontSize: value[0] }), min: 12, max: 48, step: 1, className: "w-full" }), _jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [cardData.fontSize, "px"] })] })] })] }));
};
export default StyleCustomizationSection;
